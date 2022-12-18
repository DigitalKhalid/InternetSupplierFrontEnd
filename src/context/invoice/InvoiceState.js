import React, { useState } from "react";
import InvoiceContext from './InvoiceContext'
import getListURL from '../../functions/URLs'

const InvoiceState = (props) => {
    const [invoice, setInvoice] = useState()

    // Get Invoice
    const getInvoice = async (paymentID) => {
        const url = getListURL('paymentinvoiceapi', '', '', paymentID, 'id')
        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + localStorage.getItem('authtoken')
            },
        });
        const json = await response.json();
        setInvoice(json[0])
    }


    return (
        <InvoiceContext.Provider value={{ invoice, getInvoice }}>
            {props.children}
        </InvoiceContext.Provider>
    )
}

export default InvoiceState;