const host = process.env.REACT_APP_HOST
let orderSerial = 0
let orderID = ''
let settings = ''

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

export const getOrders = async () => {
    const url = `${host}orderserialapi`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader
    });

    const json = await response.json();
    orderSerial = Math.max(...json.map(o => (o.id))) + 1
    return orderSerial
}

export const genOrderID = async () => {

    if (orderSerial === 0) {
        await getOrders()
    }
    orderID = 'CPCL-' + orderSerial.toString().padStart(5, '0')
    orderSerial = orderSerial + 1
    return orderID
}

const defaultOrderData = {
    id: '',
    date_created: '',
    order_id: '',
    connection: '',
    status: 'Pending'
}

const defaultOrderDetailData = {
    id: '',
    order: '',
    product: '',
    qty: '1',
    sale_price: '0'
}

const generateOrder = async (connection) => {

    const url = `${host}orderapi/`
    const body = { ...defaultOrderData, 'connection': connection.id, 'order_id': orderID }

    const response = await fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(body),
    })
    const json = await response.json();

    if (response.ok) {
        await addOrderDetail(json, connection.package)
    }
}


const addOrderDetail = async (order, subscribedPackage) => {
    const url = `${host}orderdetailapi/`
    const body = { ...defaultOrderDetailData, 'order': order.id, 'product': subscribedPackage.id, 'sale_price': subscribedPackage.sale_price }
    console.log(body)
    await fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(body),
    })
}

// Get period from settings for connection renewal before expiry
const getSettings = async () => {
    const url = `${host}settingsapi/`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    });

    const json = await response.json();
    settings = json[0]
}

const updateConnection = async (connection) => {
    // Update connection renewal to server
    const url = `${host}connectionapi/${connection.id}/`

    await fetch(url, {
        method: 'PATCH',
        headers: requestHeader,
        body: JSON.stringify(connection)
    });
}


// Get Connections list that will expire soon (within prescribed period)
export const updateConnectionOrderRenewal = async () => {
    const url = `${host}activevalidconnectionapi/`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    });

    const json = await response.json();

    if (response.ok) {
        let connection = ''
        getSettings()

        for (let index = 0; index < json.length; index++) {
            const con = json[index];

            if (new Date() >= new Date(new Date(con.expiry_date).setDate(new Date(con.expiry_date).getDate()-settings.renew_order_before))) {
                connection = ({ 'id': con.id, 'renewal': true })
                updateConnection(connection)
                console.log(connection)
            }

            // Generate order for this connection
            await genOrderID()
            await generateOrder(con)
        }
        return json;
    }
}