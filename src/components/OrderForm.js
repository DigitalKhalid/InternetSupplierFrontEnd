import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import OrderContext from '../context/order/OrderContext'
import ConnectionContext from '../context/connection/ConnectionContext'

const OrderForm = () => {
    const { order, setOrder } = useContext(OrderContext)
    const { connections, getConnectionsList } = useContext(ConnectionContext)

    useEffect(() => {
      getConnectionsList()
      // eslint-disable-next-line
    }, [])
    

    const handleOnChange = (event) => {
        setOrder({ ...order, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-10">
                    <p className='title required'><strong>Order ID</strong></p>
                    <input type="text" className="form-control" id="order_id" name='order_id' placeholder="" value={order.order_id} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title'><strong>Connection</strong></p>
                    <select className="form-select" id="connection" name='connection' placeholder="" value={order.connection} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {connections.map((connection) => {
                            return (
                                <option key={connection.id} value={connection.id}>{connection.connection_id} | {connection.customer_name}</option>
                            )
                        })}
                    </select>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title'><strong>Status</strong></p>
                    <select className="form-select" id='status' name='status' value={order.status} onChange={handleOnChange}>
                        <option defaultValue="Pending">Pending</option>
                        <option value="Partial">Partial</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default OrderForm