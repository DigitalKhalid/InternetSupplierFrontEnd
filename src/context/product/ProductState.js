import React, { useContext, useState } from "react";
import ProductContext from './ProductContext'
import AlertContext from "../alert/AlertContext"
import getListURL from '../../functions/URLs'

const ProductState = (props) => {
  const { showAlert } = useContext(AlertContext)

  const host = process.env.REACT_APP_HOST
  const [products, setProducts] = useState([])
  const [productsCount, setProductsCount] = useState(0)
  const [productsNext, setProductsNext] = useState('')
  const [packageList, setPackageList] = useState([])

  const blankFields = {
    id: '',
    type: '',
    catagory: '',
    title: '',
    sku: '',
    description: '',
    unit: '',
    purchase_price: '',
    sale_price: ''
  }

  const [product, setProduct] = useState(blankFields)

  // Get all Records
  const getAllProducts = async (sortField = 'title', sort = 'ASC', search = '', filterField = '') => {
    const url = getListURL('productapirelated', sortField, sort, search, filterField)
    console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setProductsCount(json.count)
    setProducts(json.results)
    setProductsNext(json.next)
  }

    // Get Product List
    const getProductList = async (sortField = 'title', sort = 'ASC', search = '', filterField = '') => {
      const url = getListURL('productlistapi', sortField, sort, search, filterField)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },
      });
      const json = await response.json();
      setProducts(json)
    }


    // Get Package List
    const getPackageList = async (sortField = 'title', sort = 'ASC', search = '', filterField = '') => {
      const url = getListURL('packagelistapi', sortField, sort, search, filterField)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + localStorage.getItem('authtoken')
        },
      });
      const json = await response.json();
      setPackageList(json)
    }

  // Append more records used for pagination
  const getMoreProducts = async () => {
    const url = productsNext
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });
    const json = await response.json();
    setProducts(products.concat(json.results))
    setProductsNext(json.next)
  }

  // Add Record
  const addProduct = async () => {
    // Add record to server
    const url = `${host}productapi/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },

      body: JSON.stringify(product)
    });
    showAlert(response.status, product.title)

    // Add record to frontend
    if (response.ok) {
      const json = await response.json();
      setProduct(json)
      setProducts(products.concat(product))
    }
  }


  // Update Record
  const updateProduct = async () => {
    // Update record to server side
    const url = `${host}productapi/${product.id}/`

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
      body: JSON.stringify(product)
    });
    // const json = await response.json();
    showAlert(response.status, product.title)


    // Update record in frontend
    if (response.ok) {
      // getAllProducts()
    }
  }


  // Delete Record
  const deleteProduct = async () => {
    // delete record from server using API
    const url = `${host}productapi/${product.id}`

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('authtoken')
      },
    });

    // delete record from frontend
    if (response.ok) {
      const productsLeft = products.filter((Product) => { return Product.id !== product.id })
      setProducts(productsLeft)
    } else {
      showAlert(response.status, product.title)
    }
  }


  return (
    <ProductContext.Provider value={{ blankFields, packageList, products, product, productsCount, productsNext, setProduct, getAllProducts, getProductList, getMoreProducts, addProduct, updateProduct, deleteProduct, getPackageList }}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState;