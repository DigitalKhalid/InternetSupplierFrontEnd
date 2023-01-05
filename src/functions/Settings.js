const host = process.env.REACT_APP_HOST

const requestHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('authtoken')
}

// Get Settings
export const getSettings = async () => {
    const url = `${host}settingsapi/`

    const response = await fetch(url, {
        method: 'GET',
        headers: requestHeader,
    });

    const json = await response.json();

    if (response.ok) {
        return json[0]
    }
}