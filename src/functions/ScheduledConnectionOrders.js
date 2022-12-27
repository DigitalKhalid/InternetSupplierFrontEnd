const host = process.env.REACT_APP_HOST
let orderSerial = 0
let orderID = ''

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

export const getAllOrders = async () => {
    const url = `${host}orderapirelated`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader
    });

    const json = await response.json();
    orderSerial = Math.max(...json.results.map(o => (o.id))) + 1
}

export const genOrderID = () => {
    if (orderSerial === 0) {
        getAllOrders()
    }
    orderID = 'CPCL-' + orderSerial.toString().padStart(5, '0')
    orderSerial = orderSerial + 1
    return orderID
}

export const defaultOrderData = {
    id: '',
    date_created: '',
    order_id: genOrderID(),
    connection: '',
    value: '0',
    status: 'Pending'
}

export const updateExpiredConnectionStatus = async () => {
    const url = `${host}activeexpiredconnectionapi/`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    });

    const json = await response.json();
    console.log(json)
    if (response.ok) {
        let connection = ''

        for (let index = 0; index < json.length; index++) {
            const con = json[index];
            connection = ({ 'id': con.id, 'status': 'Inactive' })

            // Update connection status to server
            const url = `${host}connectionapi/${connection.id}/`

            await fetch(url, {
                method: 'PATCH',
                headers: requestHeader,
                body: JSON.stringify(connection)
            });

            // Generate order for this connection
            genOrderID()
            generateScheduledOrder(connection.id)
        }
        return json;
    }
}


export const generateScheduledOrder = async (connection) => {
    const url = `${host}orderapi/`
    const body = { ...defaultOrderData, 'connection': connection, 'order_id':orderID }
   
    await fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(body),
    })
}