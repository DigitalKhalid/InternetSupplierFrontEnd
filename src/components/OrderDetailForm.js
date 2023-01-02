import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import OrderDetailContext from '../context/orderdetail/OrderDetailContext'
import ProductContext from '../context/product/ProductContext'

const OrderDetailForm = () => {
    const { orderDetail, setOrderDetail } = useContext(OrderDetailContext)
    const { products, getProductList } = useContext(ProductContext)

    useEffect(() => {
        getProductList()
        // eslint-disable-next-line
    }, [])


    const handleOnChange = (event) => {
        if (event.target.name === 'product') {
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                if (parseInt(product.id) === parseInt(event.target.value)) {
                    setOrderDetail({ ...orderDetail, 'sale_price': product.sale_price, 'product': event.target.value })
                    break
                }
            }
        } else {
            setOrderDetail({ ...orderDetail, [event.target.name]: event.target.value })
        }
    }

    return (
        <div className='container form'>
            <form className="row g-2">


                {!orderDetail.package && <div className="col-md-10">
                    <p className='title required'><strong>Product</strong></p>
                    <select className="form-select" id="product" name='product' placeholder="" value={orderDetail.product} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {products.map((product) => {
                            return (
                                <option key={product.id} value={product.id}>{product.title} | {product.sku} ({product.catagory_title})</option>
                            )
                        })}
                    </select>
                    <p className='label'></p>
                </div>}

                <div className="col-md-10">
                    <p className='title required'><strong>Quantity</strong></p>
                    <input type="text" className="form-control" id="qty" name='qty' placeholder="" value={orderDetail.qty} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Sale Price</strong></p>
                    <input type="text" className="form-control" id="sale_price" name='sale_price' placeholder="" value={orderDetail.sale_price} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default OrderDetailForm