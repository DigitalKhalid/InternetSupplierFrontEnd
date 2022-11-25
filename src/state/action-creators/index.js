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