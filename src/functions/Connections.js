const host = process.env.REACT_APP_HOST

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

// Update Connection Status to Inactive for Expired Subscription
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
        }
        return json;
    }
}