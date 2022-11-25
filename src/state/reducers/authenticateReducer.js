const reducer = (state={authtoken:null, username:null}, action)=>{
    if(action.type === 'authenticate'){
        return action.payload
    } else {
        return state;
    }
}

export default reducer;