import '../assets/css/Form.css'
import React, { useContext } from 'react'
import PaymentContext from '../context/payment/PaymentContext'
import OrderContext from '../context/order/OrderContext'

const PaymentForm = () => {
    const { payment, setPayment } = useContext(PaymentContext)
    const { order, setOrder } = useContext(OrderContext)

    const handleOnChange = (event) => {
        setPayment({ ...payment, [event.target.name]: event.target.value })

        if (event.target.name === 'amount') {
            if (order.balance <= parseInt(event.target.value)) {
                setOrder({ ...order, 'status': 'Completed' })
            }
            if (order.balance > parseInt(event.target.value)) {
                setOrder({ ...order, 'status': 'Partial' })
            }
        }
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-10">
                    <p className='title'><strong>Payment Type</strong></p>
                    <select className="form-select" disabled='true' id="payment_type" name='payment_type' placeholder="" value={payment.payment_type} onChange={handleOnChange}>
                        <option value="Debit">Receive</option>
                        <option value="Credit">Pay</option>
                    </select>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Amount</strong></p>
                    <input type="number" className="form-control" id="amount" name='amount' placeholder="" value={payment.amount} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default PaymentForm