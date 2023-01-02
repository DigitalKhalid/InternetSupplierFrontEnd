import '../assets/css/Invoice.css'
import React, { useContext, useEffect } from 'react'
import InvoiceContext from '../context/invoice/InvoiceContext'
import { format } from 'date-fns'

const Invoice = () => {
    const { invoice, getInvoice } = useContext(InvoiceContext)

    useEffect(() => {
        getInvoice(localStorage.getItem('orderid'))
        console.log(invoice)
        //   eslint-disable-next-line
    }, [])

    if (invoice) {
        return (
            <div className="invoice">
                <div className="page">
                    <div className="invoice-header">
                        <div className="row">
                            <div className="col-md-6">
                                <div className='brand'>ClickPick Pvt Ltd</div>
                                <div className="brand-address">Azizabad, <br /> Rawalpindi <br /> 000-00000000</div>
                            </div>
                            <div className="col-md-6">
                                <div className='header-title'>INVOICE</div>
                                <div className='invoice-number'># {invoice.id.toString().padStart(5, '0')}</div>
                            </div>
                        </div>
                        <hr className='hr' />
                    </div>
                    <div className="invoice-body">
                        <div className="row">
                            <div className="col-md-5">
                                Invoice to:
                                <div className="invoice-to">{invoice.connection.customer.first_name} {invoice.connection.customer.last_name}</div>
                                <div className="invoice-to-address">{invoice.connection.customer.street_address}, {invoice.connection.customer.subarea.subarea}, {invoice.connection.customer.subarea.area.area}, {invoice.connection.customer.subarea.area.city.city} </div>
                                <div className="invoice-to-address"><strong>Contact:</strong> {invoice.connection.customer.contact}</div>
                            </div>
                            <div className="col-md-4">
                                Connection Info:
                                <div className="invoice-to">{invoice.connection.connection_id}</div>
                                {console.log(invoice.connection.package)}
                                
                                {invoice.connection.package === null ? <div className="invoice-to-address"><strong>Package:</strong> None</div> : <div className="invoice-to-address"><strong>Package:</strong> {invoice.connection.package.title}</div>}
                                
                                {invoice.connection.package === null ? <div className="invoice-to-address"><strong>Package Price:</strong> Rs. 0.0</div> : <div className="invoice-to-address"><strong>Package Price:</strong> Rs.{invoice.connection.package.sale_price}</div>}
                                <div className="invoice-to-address"><strong>Subarea:</strong> {invoice.connection.subarea.subarea}</div>
                            </div>
                            <div className="col-md-3">
                                Received By:
                                <div className="invoice-to">ClickPick</div>
                                <div className="invoice-to-address"><strong>Order ID:</strong> {invoice.order_id}</div>
                                <div className="invoice-to-address"><strong>Dated:</strong> {format(new Date(invoice.date_created), 'dd-MM-yyyy')}</div>
                                <div className="invoice-to-address"><strong>Status:</strong> {invoice.status}</div>
                            </div>
                        </div>
                        
                        <div className="row invoice-list">
                            <div className="col-md-12">
                                <hr className='seperator' />
                                <table>
                                    <thead className='table-header'>
                                        <tr>
                                            <th className='left'>Description</th>
                                            <th>Qty</th>
                                            <th>Unit Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className='list-body'>
                                        {invoice.details.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className='left'>{item.product.title} ({item.product.sku}) - {item.product.catagory.title} <br />
                                                    {item.packagedetails && <small>valid from {format(new Date(item.packagedetails.valid_from), 'dd-MM-yyyy')} ~ {format(new Date(item.packagedetails.valid_to), 'dd-MM-yyyy')}</small>}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.sale_price}</td>
                                                    <td>{(item.qty * item.sale_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td className='invoice-summary'></td>
                                            <td className='invoice-summary'></td>
                                            <td className='invoice-summary'><strong>Total Amount</strong></td>
                                            <td className='invoice-summary'>{invoice.details.reduce((total, value) => total = total + (value.sale_price * value.qty), 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        </tr>
                                        <tr>
                                            <td className='left'></td>
                                            <td className='left'></td>
                                            <td><strong>Received</strong></td>
                                            {invoice.payment_received !== null ? <td>{invoice.payment_received.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td> : <td>0.00</td>}
                                        </tr>
                                        <tr>
                                            <td className='left'></td>
                                            <td className='left'></td>
                                            <td><strong>Balance</strong></td>
                                            <td>{(invoice.details.reduce((total, value) => total = total + (value.sale_price * value.qty), 0) - invoice.payment_received).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="invoice-notes"><strong>Notes:</strong><br /> This is system generated invoice and needs no signature.</div>
                    <div className="invoice-to-address"><small>Printed on {format(new Date(), 'dd-MM-yyyy')}</small></div>
                    <div className="invoice-footer">
                        Powered By: BizzSole
                    </div>
                </div>
            </div>
        )
    }
}

export default Invoice;