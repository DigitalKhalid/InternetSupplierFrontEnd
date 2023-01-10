import '../assets/css/Bill.css'
import React, { useContext, useEffect } from 'react'
import InvoiceContext from '../context/invoice/InvoiceContext'
import { format } from 'date-fns'

const Bill = () => {
    const { invoice, getInvoice } = useContext(InvoiceContext)

    useEffect(() => {
        getInvoice(localStorage.getItem('orderid'))
        //   eslint-disable-next-line
    }, [])

    if (invoice) {
        return (
            <div className="bill">
                <div className="bill-page">
                    <div className="bill-header">
                        <div><strong>ClickPick Pvt Ltd.</strong></div>
                        <div><small> Azizabad, Rawalpindi</small></div>
                    </div>
                    <hr className='seperator' />
                    <div className="bill-body">
                        <div><strong>Bill No. {invoice.id.toString().padStart(5, '0')} | Order ID: {invoice.order_id}</strong></div>
                        <div>Date: {format(new Date(), 'dd-MM-yyyy hh:mm a')}</div>
                        <div></div>
                        <div>Received By: {invoice.cashier_name}</div>
                        <div>Paid By: {invoice.connection.customer.first_name} {invoice.connection.customer.last_name} ({invoice.connection.customer.customer_type})</div>
                        <div>{invoice.connection.connection_id} | {invoice.connection.subarea.subarea}</div>

                        <div className="row bill-list">
                            <div className="col-md-12">
                                <table>
                                    <thead className='table-header'>
                                        <tr>
                                            <th className='left list-border-top list-border-bottom'>Description</th>
                                            <th className='list-border-top list-border-bottom'>Qty</th>
                                            <th className='list-border-top list-border-bottom'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className='list-body'>
                                        {invoice.details.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className='left'>{item.product.title} ({item.product.sku}) <br />
                                                        {item.packagedetails && <small>expiry: {format(new Date(item.packagedetails.valid_to), 'dd-MM-yyyy')}</small>}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{(item.qty * item.sale_price)}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td className='list-border-top left'><strong>Total Amount</strong></td>
                                            <td className='list-border-top'></td>
                                            <td className='list-border-top'>{invoice.details.reduce((total, value) => total = total + (value.sale_price * value.qty), 0)}</td>
                                        </tr>
                                        <tr>
                                            <td className='left'><strong>Received</strong></td>
                                            <td></td>
                                            {invoice.payment_received !== null ? <td>{invoice.payment_received}</td> : <td>0.00</td>}
                                        </tr>
                                        <tr>
                                            <td className='left'><strong>Balance</strong></td>
                                            <td className='left'></td>
                                            <td>{(invoice.details.reduce((total, value) => total = total + (value.sale_price * value.qty), 0) - invoice.payment_received)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bill-footer">
                        <div className='bill-notes'>
                            THANK YOU
                        </div>
                        <div>for any query contact : 0000-000000000</div>
                        <strong>Powered By: BizzSole</strong>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bill;