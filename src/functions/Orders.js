import { addDays, addMonths, format, parseISO } from 'date-fns'
import { updateConnectionStatus } from './Connections'
import { getSettings } from './Settings'

const host = process.env.REACT_APP_HOST
let orderSerial = 0
let orderID = ''

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

    if (packageDetail.type.title === 'Package') {
        const date = new Date(connectionExpiryDate)
        const activation_date = connectionExpiryDate ? addDays(date, 1) : new Date()
        const subscription_period = orderDetail.qty * packageDetail.unit.value
        const expiry_date = format(addMonths(activation_date, subscription_period) , 'yyyy-MM-dd')

        const url = `${host}orderpackagedetailapi/`
        const body = { ...defaultOrderPackageData, 'package': orderDetail.id, 'valid_from': format(new Date(activation_date), 'yyyy-MM-dd'), 'valid_to': expiry_date }
    
        await fetch(url, {
            method: 'POST',
            headers: requestHeader,
            body: JSON.stringify(body),
        })
    }
}

export const autoUpdateOrderPackageDetails = async (orderDetail) => {
    const packageDetail = await getPackageDetail(orderDetail.product)

    if (packageDetail.type.title === 'Package') {
        const activation_date = parseISO(orderDetail.packagedetails.valid_from) 
        const subscription_period = orderDetail.qty * packageDetail.unit.value
        console.log(subscription_period)
        const expiry_date = format(addMonths(activation_date, subscription_period) , 'yyyy-MM-dd')

        const url = `${host}orderpackagedetailapi/${orderDetail.packagedetails.id}/`

        const body = { ...defaultOrderPackageData, 'package':orderDetail.id, 'valid_from': format(new Date(activation_date), 'yyyy-MM-dd'), 'valid_to': expiry_date }
    
        await fetch(url, {
            method: 'PUT',
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
// const getSettings = async () => {
//     const url = `${host}settingsapi/`

//     const response = await fetch(url, {
//         method: 'GET',
//         headers: requestHeader,
//     });

//     const json = await response.json();

//     if (response.ok) {
//         return json[0]
//     }
// }


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
                    updateConnectionStatus(con.id, '', true)
                    
                    // Generate order for this connection
                    await genOrderID()
                    await generateOrder(con)
                }
            }
            return json;
        }
    }
}