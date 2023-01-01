import '../assets/css/Form.css'
import React, { useContext } from 'react'
import OrderDetailContext from '../context/orderdetail/OrderDetailContext'

const OrderPackageDetailForm = () => {
    const { orderPackageDetail, setOrderPackageDetail } = useContext(OrderDetailContext)

    const handleOnChange = (event) => {
        setOrderPackageDetail({ ...orderPackageDetail, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">

                <div className="col-md-10">
                    <p className='title required'><strong>Valid From</strong></p>
                    <input type="date" className="form-control" id="valid_from" name='valid_from' placeholder="" value={orderPackageDetail.valid_from} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Valid To</strong></p>
                    <input type="date" className="form-control" id="valid_to" name='valid_to' placeholder="" value={orderPackageDetail.valid_to} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default OrderPackageDetailForm