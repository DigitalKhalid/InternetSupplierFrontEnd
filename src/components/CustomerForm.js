import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import CustomerContext from '../context/customer/CustomerContext'
import CountryContext from '../context/country/CountryContext'
import CityContext from '../context/city/CityContext'
import AreaContext from '../context/area/AreaContext'
import SubAreaContext from '../context/subarea/SubAreaContext'

const CustomerForm = () => {
    const { customer, setCustomer } = useContext(CustomerContext)
    const { countries, getCountriesList } = useContext(CountryContext)
    const { cities, getCitiesList } = useContext(CityContext)
    const { areas, getAreasList } = useContext(AreaContext)
    const { subAreas, getSubAreasList } = useContext(SubAreaContext)

    useEffect(() => {
        getCountriesList()
        if (customer.country > 0) {
            getCitiesList('city', 'ASC', customer.country, 'country')
        }

        if (customer.city > 0) {
            getAreasList('area', 'ASC', customer.city, 'city')
        }

        if (customer.area > 0) {
            getSubAreasList('subarea', 'ASC', customer.area, 'area')
        }

        // eslint-disable-next-line
    }, [customer.country, customer.city, customer.area])

    const handleOnChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    // const handleOnCheck = (event) => {
    //     setCustomer({ ...customer, [event.target.name]: event.target.checked })
    // }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-10">
                    <p className='title required'><strong>Full Name</strong></p>
                    <input type="text" className="form-control" id="first_name" name='first_name' placeholder="" value={customer.first_name} onChange={handleOnChange} ></input>
                    <p className='label'>First Name</p>
                </div>

                <div className="col-md-10">
                    {/* <p className='title'><strong></strong></p> */}
                    <input type="text" className="form-control" id="last_name" name='last_name' placeholder="" value={customer.last_name} onChange={handleOnChange} ></input>
                    <p className='label'>Last Name</p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Email Address</strong></p>
                    <input type="email" className="form-control" id="email" name='email' placeholder="" value={customer.email} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Contact No.</strong></p>
                    <input type="text" className="form-control" id="contact" name='contact' placeholder="" value={customer.contact} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>

                <div className="col-md-10">
                    <p className='title required'><strong>Address</strong></p>
                    <input type="text" className="form-control" id="street_address" name='street_address' placeholder="" value={customer.street_address} onChange={handleOnChange} ></input>
                    <p className='label'>Street Address</p>
                </div>

                <div className="col-md-10">
                    {/* <p className='title'><strong>Country</strong></p> */}
                    <select className="form-select" id="country" name='country' placeholder="" value={customer.country} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {countries.map((country) => {
                            return (
                                <option key={country.id} value={country.id}>{country.country}</option>
                            )
                        })}
                    </select>
                    <p className='label'>Country</p>
                </div>

                <div className="col-md-10">
                    {/* <p className='title'><strong>City</strong></p> */}
                    <select className="form-select" id="city" name='city' placeholder="" value={customer.city} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {cities.map((city) => {
                            return (
                                <option key={city.id} value={city.id}>{city.city}</option>
                            )
                        })}
                    </select>
                    <p className='label'>City</p>
                </div>

                <div className="col-md-10">
                    {/* <p className='title'><strong>Area</strong></p> */}
                    <select className="form-select" id="area" name='area' placeholder="" value={customer.area} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {areas.map((area) => {
                            return (
                                <option key={area.id} value={area.id}>{area.area}</option>
                            )
                        })}
                    </select>
                    <p className='label'>Area</p>
                </div>

                <div className="col-md-10">
                    {/* <p className='title'><strong></strong></p> */}
                    <select className="form-select" id='subarea' name='subarea' value={customer.subarea} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {subAreas.map((subarea) => {
                            return (
                                <option key={subarea.id} value={subarea.id}>{subarea.subarea}</option>
                            )
                        })}
                    </select>
                    <p className='label'>Subarea</p>
                </div>

                {/* <div className="form-check col-md-10">
                    <input className="form-check-input" type="checkbox" value="true" id="createconnection" name='createconnection' onChange={handleOnCheck}></input>
                    <label className="form-check-label" htmlFor="flexCheckDefault">Create Connection</label>
                </div> */}
            </form>
        </div>
    )
}

export default CustomerForm