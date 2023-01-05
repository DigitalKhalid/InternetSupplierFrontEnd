import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import ProductContext from '../context/product/ProductContext'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCatagories } from '../features/productcatagory/catagorySlice'
import { getAllUnits } from '../features/units/unitSlice'

const ProductForm = (props) => {
    const { type } = props
    const { product, setProduct } = useContext(ProductContext)
    const catagories = useSelector((state) => state.catagory.catagories)
    const units = useSelector((state) => state.unit.units)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCatagories('?type__title=' + type))
        if (type !== 'Package') {
            dispatch(getAllUnits('?value=0'))
        } else {
            dispatch(getAllUnits())
        }
        // eslint-disable-next-line
    }, [type])

    const handleOnChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">

                <div className="col-md-10">
                    <p className='title'><strong>Catagory</strong></p>
                    <select className="form-select" id="catagory" name='catagory' placeholder="" value={product.catagory} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {catagories.map((catagory) => {
                            return (
                                <option key={catagory.id} value={catagory.id}>{catagory.title}</option>
                            )
                        })}
                    </select>
                    <p className='label'></p>
                </div>

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
                    <p className='title'><strong>{type==='Package'?'Subscription Frequency':'Unit of Measure'}</strong></p>
                    <select className="form-select" id="unit" name='unit' placeholder="" value={product.unit} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {units.map((unit) => {
                            return (
                                <option key={unit.id} value={unit.id}>{unit.title}</option>
                            )
                        })}
                    </select>
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