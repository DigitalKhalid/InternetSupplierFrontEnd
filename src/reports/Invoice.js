import '../assets/css/Invoice.css'
import React from 'react'

const Invoice = () => {
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
                            <div className='invoice-number'># 102</div>
                        </div>
                    </div>
                    <hr className='hr' />
                </div>
                <div className="invoice-body">
                    <div className="row">
                        <div className="col-md-4">
                            Invoice to:
                            <div className="invoice-to">Customer Name</div>
                            <div className="invoice-to-address">Customer Address</div>
                            <div className="invoice-to-address">Customer Contact</div>
                        </div>
                        <div className="col-md-4">
                            Connection Info:
                            <div className="invoice-to">Connection ID</div>
                            <div className="invoice-to-address">Package: </div>
                            <div className="invoice-to-address">Package Price:</div>
                        </div>
                        <div className="col-md-4">
                            Received By:
                            <div className="invoice-to">Cashier Name</div>
                            <div className="invoice-to-address">Receipt Date: </div>
                            <div className="invoice-to-address">Issue Date:</div>
                        </div>
                    </div>
                    <div className="row invoice-list">
                        <div className="col-md-12">
                            <table>
                                <thead className='list-head'>
                                    <tr>
                                        <th className='left'>Description</th>
                                        <th>Month</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody className='list-body'>
                                    <tr>
                                        <td className='left'>Package 1254</td>
                                        <td>Dec, 2022</td>
                                        <td>2500.00</td>
                                    </tr>
                                    <tr>
                                        <td className='left'>Package 1254</td>
                                        <td>Dec, 2022</td>
                                        <td>2500.00</td>
                                    </tr>
                                    <tr>
                                        <td className='left'></td>
                                        <td><strong>Total Amount</strong></td>
                                        <td>5000.00</td>
                                    </tr>
                                    <tr>
                                        <td className='left'></td>
                                        <td><strong>Received</strong></td>
                                        <td>5000.00</td>
                                    </tr>
                                    <tr>
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
                <div className="invoice-footer">
                    Powered By: BizzSole
                </div>
            </div>
        </div>
    )
}

export default Invoice;