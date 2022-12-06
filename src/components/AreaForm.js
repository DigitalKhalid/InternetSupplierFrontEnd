import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import CountryContext from '../context/country/CountryContext'
import CityContext from '../context/city/CityContext'
import AreaContext from '../context/area/AreaContext'

const AreaForm = () => {
    const { area, setArea } = useContext(AreaContext)
    const { countries, getCountriesList } = useContext(CountryContext)
    const { cities, getCitiesList } = useContext(CityContext)

    useEffect(() => {
        getCountriesList('country', 'ASC', '')
        getCitiesList('city', 'ASC', area.country, 'country')
        // eslint-disable-next-line
    }, [area.country])

    const handleOnChange = (event) => {
        setArea({ ...area, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-12">
                    <p className='title'><strong>Country</strong></p>
                    <select className="form-select" id="country" name='country' placeholder="" value={area.country} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {countries.map((country) => {
                            return (
                                <option key={country.id} value={country.id}>{country.country}</option>
                            )
                        })}
                    </select>
                    <p className='label'></p>
                </div>

                <div className="col-md-12">
                    <p className='title'><strong>City</strong></p>
                    <select className="form-select" id="city" name='city' placeholder="" value={area.city} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {cities.map((city) => {
                            return (
                                <option key={city.id} value={city.id}>{city.city}</option>
                            )
                        })}
                    </select>
                    <p className='label'></p>
                </div>

                <div className="col-md-12">
                    <p className='title required'><strong>Area</strong></p>
                    <input type="text" className="form-control" id="area" name='area' placeholder="" value={area.area} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default AreaForm