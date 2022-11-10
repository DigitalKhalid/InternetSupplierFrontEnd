import React from "react";
import CustomerContext from './CustomerContext'

const CustomerState = (props) => {
    const state = {
        "title":"Test",
        "path":'/test'
    }

    return (
        <CustomerContext.Provider value={state}>
            {props.children}
        </CustomerContext.Provider>
    )
}

export default CustomerState;