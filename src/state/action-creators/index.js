export const depositMoney = (amount)=>{
    return (dispatch) =>{
        dispatch({
            type: 'deposit',
            payload: amount
        })
    } 
}

export const withdrawMoney = (amount)=>{
    return (dispatch) =>{
        dispatch({
            type: 'withdraw',
            payload: amount
        })
    } 
}

export const authenticate = (authtoken, username)=>{
    return (dispatch) =>{
        dispatch({
            type: 'authenticate',
            payload: {authtoken, username}
        })
    } 
}

export const getCountry = (field, sort, search)=>{
    return (dispatch) =>{
        dispatch({
            type: 'getCountry',
            payload: {field, sort, search}
        })
    } 
}