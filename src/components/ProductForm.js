import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import ProductContext from '../context/product/ProductContext'

const ProductForm = () => {
    const { product, setProduct } = useContext(ProductContext)

    // useEffect(() => {
    //     setProduct({...product, 'catagory':1})
    //     // eslint-disable-next-line
    // }, [])

    const handleOnChange = (event) => {
        setProduct({ ...product, 'catagory':1, 'type':2, 'unit':1, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-10">
                    <p className='title required'><strong>Title</strong></p>
                    <input type="text" className="form-control" id="title" name='title' placeholder="" value={product.title} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title'><strong>SKU</strong></p>
                    <input type="text" className="form-control" id="sku" name='sku' placeholder="" value={product.sku} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Description</strong></p>
                    <input type="text" className="form-control" id="description" name='description' placeholder="" value={product.description} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Purchase Price</strong></p>
                    <input type="text" className="form-control" id="purchase_price" name='purchase_price' placeholder="" value={product.purchase_price} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Sale Price</strong></p>
                    <input type="text" className="form-control" id="sale_price" name='sale_price' placeholder="" value={product.sale_price} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default ProductForm