import { addDays, format } from "date-fns"
import { updateConnectionStatus } from "./Connections"

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
export const addPackageSubscription = async (paymentID, order) => {
    // Add record to server
    const url = `${host}packagesubscriptionapi/`
    const tempValidityExtention = 5
    const connectionID = order.connection
    const packageID = order.package

    for (let index = 0; index < order.details.length; index++) {
        const item = order.details[index];
        if (item.product.id === parseInt(order.package)) {
            if (item.packagedetails !== null) {
                const activationDate = format(new Date(item.packagedetails.valid_from), 'yyyy-MM-dd')
                const expiryDate = format(new Date(item.packagedetails.valid_to), 'yyyy-MM-dd')
                const tempExpiryDate = format(addDays(new Date(expiryDate), tempValidityExtention), 'yyyy-MM-dd')

                const body = { ...blankFields, 'connection': connectionID, 'package': packageID, 'payment': paymentID, 'activation_date': activationDate, 'expiry_date': expiryDate, 'temp_expiry_date': tempExpiryDate }

                const response = await fetch(url, {
                    method: 'POST',
                    headers: requestHeader,
                    body: JSON.stringify(body)
                });

                if (response.ok) {
                    if (new Date() < expiryDate) {
                        await updateConnectionStatus(connectionID, 'Active')
                    }
                }

                break
            }
        }
    }


}