const host = process.env.REACT_APP_HOST

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

export const updateConnectionStatus = async (connectionID, status, renewal) => {
    const url = `${host}connectionapi/${connectionID}/`
    let body = ''
    if (status !== '') {
        if (renewal !== '') {
            body = ({ 'id': connectionID, 'status': status, 'renewal':renewal })
        } else {
            body = ({ 'id': connectionID, 'status': status })
        }

    } else {
        if (renewal !== '') {
            body = ({ 'id': connectionID, 'renewal':renewal })
        }
    }

    await fetch(url, {
        method: 'PATCH',
        headers: requestHeader,
        body: JSON.stringify(body)
    });
}


// Update Connection Status to Inactive for Expired Subscription
export const updateExpiredConnectionStatus = async () => {
    const url = `${host}activeexpiredconnectionapi/`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    });

    const json = await response.json();

    if (response.ok) {

        for (let index = 0; index < json.length; index++) {
            const con = json[index];
            updateConnectionStatus(con.id, 'Inactive')
        }
        return json;
    }
}