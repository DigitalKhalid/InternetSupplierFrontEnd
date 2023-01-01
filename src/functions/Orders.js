import { format } from 'date-fns'

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

const defaultOrderPackageData = {
    id: '',
    package: '',
    valid_from: '',
    valid_to: '',
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
        await addOrderDetail(json, connection.package, connection.expiry_date)
    }
}


const addOrderDetail = async (order, subscribedPackage, connectionExpiryDate) => {
    const url = `${host}orderdetailapi/`
    const body = { ...defaultOrderDetailData, 'order': order.id, 'product': subscribedPackage.id, 'sale_price': subscribedPackage.sale_price }

    const response = await fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(body),
    })
    const json = await response.json();

    if (response.ok) {
        await addOrderPackageDetail(json, connectionExpiryDate)
    }
}

export const addOrderPackageDetail = async (orderDetail, connectionExpiryDate) => {
    const packageDetail = await getPackageDetail(orderDetail.product)

    if (packageDetail.catagory.title === 'Package') {
        const date = new Date(connectionExpiryDate)
        const activation_date = connectionExpiryDate ? new Date(date.setDate(date.getDate() + 1)) : new Date()
        const subscription_period = orderDetail.qty * packageDetail.unit.value
        const expiry_date = format(new Date(activation_date.setDate(activation_date.getMonth() + subscription_period)), 'yyyy-MM-dd')

        console.log(new Date(activation_date.setDate(activation_date.getMonth() + subscription_period)))

        const url = `${host}orderpackagedetailapi/`
        const body = { ...defaultOrderPackageData, 'package': orderDetail.id, 'valid_from': format(new Date(activation_date), 'yyyy-MM-dd'), 'valid_to': format(new Date(expiry_date), 'yyyy-MM-dd') }
    
        await fetch(url, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify(body),
        })
    }
}

// Get Package(Product) detail to add order detail package data
const getPackageDetail = async (productID) => {
    const url = `${host}productapirelated/?id=${productID}`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    })
    const json = await response.json();

    if (response.ok) {
        return json.results[0]
    }
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

    if (response.ok) {
        return settings
    }
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
export const updateConnectionOrderRenewal = async (connection) => {
    if (connection) {
        await genOrderID()
        await generateOrder(connection)

    } else {
        const url = `${host}activevalidconnectionapi/`
        
        const response = await fetch(url, {
            method: 'GET',
            headers: requestHeader,
        });
    
        const json = await response.json();

        if (response.ok) {
            const settings = getSettings()
    
            for (let index = 0; index < json.length; index++) {
                const con = json[index];
    
                if (new Date() >= new Date(new Date(con.expiry_date).setDate(new Date(con.expiry_date).getDate() - settings.renew_order_before))) {
                    const connection = ({ 'id': con.id, 'renewal': true })
                    updateConnection(connection)
                    console.log('connection')
                    
                    // Generate order for this connection
                    await genOrderID()
                    await generateOrder(con)
                }
            }
            return json;
        }
    }
}