import '../assets/css/Invoice.css'
import React, { useContext, useEffect } from 'react'
import InvoiceContext from '../context/invoice/InvoiceContext'
import { format } from 'date-fns'

const Invoice = () => {
    const { invoice, getInvoice } = useContext(InvoiceContext)

    useEffect(() => {
        getInvoice(localStorage.getItem('paymentid'))
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
                                <div className="invoice-to">{invoice.order.connection.customer.first_name} {invoice.order.connection.customer.last_name}</div>
                                <div className="invoice-to-address">{invoice.order.connection.customer.street_address}, {invoice.order.connection.customer.subarea.subarea}, {invoice.order.connection.customer.subarea.area.area}, {invoice.order.connection.customer.subarea.area.city.city} </div>
                                <div className="invoice-to-address"><strong>Contact:</strong> {invoice.order.connection.customer.contact}</div>
                            </div>
                            <div className="col-md-4">
                                Connection Info:
                                <div className="invoice-to">{invoice.order.connection.connection_id}</div>
                                <div className="invoice-to-address"><strong>Package:</strong> {invoice.order.connection.package.title}</div>
                                <div className="invoice-to-address"><strong>Package Price:</strong> Rs.{invoice.order.connection.package.sale_price}</div>
                                <div className="invoice-to-address"><strong>Subarea:</strong> {invoice.order.connection.subarea.subarea}</div>
                            </div>
                            <div className="col-md-3">
                                Received By:
                                <div className="invoice-to">ClickPick</div>
                                <div className="invoice-to-address"><strong>Receipt Date:</strong> {format(new Date(invoice.date_created), 'dd-MM-yyyy')}</div>
                                <div className="invoice-to-address"><strong>Order ID:</strong> {invoice.order.order_id}</div>
                                <div className="invoice-to-address"><strong>Order Status:</strong> {invoice.order.status}</div>
                            </div>
                        </div>
                        <div className="row invoice-list">
                            <div className="col-md-12">
                                <table>
                                    <thead className='list-head'>
                                        <tr>
                                            <th className='left'>Description</th>
                                            <th>Qty</th>
                                            <th>Unit Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className='list-body'>
                                        {invoice.order.details.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td className='left'>{item.product}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{item.sale_price}</td>
                                                    <td>{item.qty * item.sale_price}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td className='invoice-summary'></td>
                                            <td className='invoice-summary'></td>
                                            <td className='invoice-summary'><strong>Total Amount</strong></td>
                                            <td className='invoice-summary'>{invoice.order.value}</td>
                                        </tr>
                                        <tr>
                                            <td className='left'></td>
                                            <td className='left'></td>
                                            <td><strong>Received</strong></td>
                                            <td>{invoice.amount}</td>
                                        </tr>
                                        <tr>
                                            <td className='left'></td>
                                            <td className='left'></td>
                                            <td><strong>Balance</strong></td>
                                            <td>0.00</td>
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