import { addDays, addMonths, format, parseISO } from 'date-fns'
import { updateConnectionStatus } from './Connections'
import store from '../redux/store'
import { getSettings } from '../features/settings/settingSlice'
import { getOrderSerial, updateOrderSerial } from '../features/orders/orderSlice'

const host = process.env.REACT_APP_HOST
const settings = store.getState().setting.settings

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

const genOrderID = async () => {
    let orderID = ''
    let orderSerial = store.getState().order.orderSerial

    if (orderSerial === 0) {
        await store.dispatch(getOrderSerial())
        orderSerial = store.getState().order.orderSerial
    }


    orderID = settings.order_id_prefix + orderSerial.toString().padStart(5, '0')

    store.dispatch(updateOrderSerial(orderSerial + 1))
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

const generateOrder = async (orderID, connection) => {
    const url = `${host}orderapi/`
    const body = { ...defaultOrderData, 'connection': connection.id, 'order_id': orderID }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },
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
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },
        body: JSON.stringify(body),
    })
    const json = await response.json();

    if (response.ok) {
        await addOrderPackageDetail(json, connectionExpiryDate)
    }
}

export const addOrderPackageDetail = async (orderDetail, connectionExpiryDate) => {
    const packageDetail = await getPackageDetail(orderDetail.product)

    if (packageDetail.catagory.type.title === 'Package') {
        const date = new Date(connectionExpiryDate)
        const activation_date = connectionExpiryDate ? addDays(date, 1) : new Date()
        const subscription_period = orderDetail.qty * packageDetail.unit.value
        const expiry_date = format(addMonths(activation_date, subscription_period), 'yyyy-MM-dd')

        const url = `${host}orderpackagedetailapi/`
        const body = { ...defaultOrderPackageData, 'package': orderDetail.id, 'valid_from': format(new Date(activation_date), 'yyyy-MM-dd'), 'valid_to': expiry_date }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
            body: JSON.stringify(body),
        })

        return response.ok
    }
}

export const autoUpdateOrderPackageDetails = async (orderDetail) => {
    const packageDetail = await getPackageDetail(orderDetail.product)

    if (packageDetail.type.title === 'Package') {
        const activation_date = parseISO(orderDetail.packagedetails.valid_from)
        const subscription_period = orderDetail.qty * packageDetail.unit.value

        const expiry_date = format(addMonths(activation_date, subscription_period), 'yyyy-MM-dd')

        const url = `${host}orderpackagedetailapi/${orderDetail.packagedetails.id}/`

        const body = { ...defaultOrderPackageData, 'package': orderDetail.id, 'valid_from': format(new Date(activation_date), 'yyyy-MM-dd'), 'valid_to': expiry_date }

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
            body: JSON.stringify(body),
        })
    }
}

// Get Package(Product) detail to add order detail package data
const getPackageDetail = async (productID) => {
    const url = `${host}productapirelated/?id=${productID}`

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },
    })
    const json = await response.json();

    if (response.ok) {
        return json.results[0]
    }
}

// Generate orders for Connections that will expire soon (within prescribed period) or generate order for connection specified
export const updateConnectionOrderRenewal = async (connection = '') => {
    if (connection) {
        // Generate order for this connection
        const orderID = await genOrderID()
        await generateOrder(orderID, connection)
        // updateConnectionStatus(connection.id, '', true)

    } else {
        const url = `${host}activevalidconnectionapi/`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });

        if (response.ok) {
            const json = await response.json();

            await store.dispatch(getSettings())

            for (let index = 0; index < json.length; index++) {
                const con = json[index];
                if (new Date() >= new Date(new Date(con.expiry_date).setDate(new Date(con.expiry_date).getDate() - settings.renew_order_before))) {

                    // Generate order for this connection
                    const orderID = await genOrderID()
                    await generateOrder(orderID, con)

                    updateConnectionStatus(con.id, '', true)
                }
            }
            return json;
        }
    }
}