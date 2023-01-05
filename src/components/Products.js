import '../assets/css/List.css'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductContext from '../context/product/ProductContext'
import PopupContext from '../context/popup/PopupContext'
import Popup from './Popup'
import ProductForm from './ProductForm'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from './Pagination'
import Spinner from './Spinner'

export const Products = (props) => {
    let { productType } = props
    const { blankFields, products, setProduct, productsNext, productsCount, getMoreProducts, getAllProducts, updateProduct, addProduct, deleteProduct } = useContext(ProductContext)
    const { togglePopup } = useContext(PopupContext)
    const [operation, setOperation] = useState(null)
    const [sort, setSort] = useState('ASC')
    const [column, setColumn] = useState('title')
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        getAllProducts(column, sort, productType + "&search=" + searchText, 'catagory__type__title')
        //   eslint-disable-next-line
    }, [sort, column, searchText, productType])

    const openNewPopup = () => {
        setOperation('add')
        setProduct(blankFields)
        togglePopup()
    }

    const openEditPopup = (product) => {
        const productEdit = { ...product, 'catagory': product.catagory.id, 'unit': product.unit.id }
        setOperation('update')
        setProduct(productEdit)
        togglePopup()
    }

    const openDeletePopup = (product) => {
        setOperation('delete')
        setProduct(product)
        togglePopup()
    }

    const addRecord = () => {
        addProduct()
        togglePopup()
    }

    const updateRecord = () => {
        updateProduct(productType)
        togglePopup()
        // getAllProducts(column, sort, productType + "&search=" + searchText, 'catagory__type__title')
    }

    const deleteRecord = () => {
        deleteProduct()
        togglePopup()
    }

    const sorting = (col) => {
        setColumn(col)
        if (sort === 'ASC') {
            setSort('DESC')

        } else if (sort === 'DESC') {
            setSort('ASC')
        }
    }

    return (
        <>
            {/* Headers */}
            <div className="list-headers">
                <input type="text" className="search-control" id="search" name='search' placeholder="Search" onChange={(event) => setSearchText(event.target.value)}></input>
                <button className="btn btn-primary" onClick={openNewPopup}>Add {productType}</button>
            </div>

            {/* List */}
            <div className='list' id='list'>
                <InfiniteScroll
                    scrollableTarget='list'
                    dataLength={products.length}
                    next={getMoreProducts}
                    hasMore={products.length < productsCount}
                // loader={<Spinner />}
                >
                    <table>
                        <thead className='list-head'>
                            <tr>
                                <th className='sorting-head' onClick={() => sorting('title')}>Title <i className={`${column + sort === 'titleASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'titleDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('sku')}>SKU <i className={`${column + sort === 'skuASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'skuDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('description')}>Description <i className={`${column + sort === 'descriptionASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'descriptionDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>
                                
                                <th className='sorting-head' onClick={() => sorting('unit__title')}>{productType==='Package'?'Period':'Unit'} <i className={`${column + sort === 'unit__titleASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'unit__titleDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th className='sorting-head' onClick={() => sorting('sale_price')}>Sale Price <i className={`${column + sort === 'sale_priceASC' ? 'sort-btn fa fa-sort-up' : column + sort === 'sale_priceDESC' ? 'sort-btn fa fa-sort-down' : 'sort-btn fa fa-sort'}`}></i></th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='list-body'>
                            {products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.title}</td>
                                        <td>{product.sku}</td>
                                        <td>{product.description}</td>
                                        <td>{product.unit.title}</td>
                                        <td>{product.sale_price}</td>
                                        <td >
                                            <Link className='action-btn' onClick={() => openDeletePopup(product)} ><i className='fa fa-trash-can'></i></Link>
                                            <Link className='action-btn' onClick={() => openEditPopup(product)} ><i className='fa fa-pen-to-square'></i></Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </InfiniteScroll>
            </div>

            {/* Pagination */}
            <Pagination showedRecords={products.length} totalRecords={productsCount} nextPage={productsNext} getMoreRecords={getMoreProducts} />

            {/* Popup Forms */}
            <div>
                {operation === 'update' && <Popup header='Edit Product' body={<ProductForm type={productType}/>} btnCancel='Cancel' btnOk='Save' btnOkClick={updateRecord} />}

                {operation === 'add' && <Popup header='Add New Product' body={<ProductForm type={productType} />} btnCancel='Cancel' btnOk='Save' btnOkClick={addRecord} />}

                {operation === 'delete' && <Popup header='Delete Product' body='Are you sure to delete this product?' btnCancel='No' btnOk='Yes' btnOkClick={deleteRecord} alerts={false} />}
            </div>
        </>
    )
}