const host = process.env.REACT_APP_HOST

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

const blankFields = {
    id: '',
    date_created: '',
    connection: '',
    package: '',
    payment: '',
    activation_date: '',
    expiry_date: '',
    temp_expiry_date: ''
}

// Add Record
export const addPayment = async (connection, order, payment) => {
    // Add record to server
    const url = `${host}packagesubscriptionapi/`

    const date = new Date(connection.expiry_date)
    const activation_date = new Date(date.setDate(date.getDate() + 1))

    for (let index = 0; index < order.details.length; index++) {
        const item = order.details[index];
        if (item.catagory.title === 'Package') {
            const subscription_period = item.qty * item.unit.value
            return subscription_period
        }
    }

    const expiry_date = new Date(activation_date.setDate(activation_date.getMonth() + subscription_period))
    const body = { ...blankFields, 'connection': connection.id, 'package': connection.package.id, 'payment': payment, 'activation_date': activation_date, 'expiry_date': expiry_date }

    const response = await fetch(url, {
        method: 'POST',
        headers: requestHeader,
        body: JSON.stringify(body)
    });
    showAlert(response.status, '')

    // Add record to frontend
    if (response.ok) {
        const json = await response.json();
    }
}