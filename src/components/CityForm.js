import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import CountryContext from '../context/country/CountryContext'
import CityContext from '../context/city/CityContext'

const CityForm = () => {
    const { city, setCity } = useContext(CityContext)
    const { countries, getCountriesList } = useContext(CountryContext)

    useEffect(() => {
        getCountriesList('country', 'ASC', '')
      // eslint-disable-next-line
    }, [])
    
    const handleOnChange = (event) => {
        setCity({ ...city, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
            <div className="col-md-12">
                    <p className='title'><strong>Country</strong></p>
                    <select className="form-select" id="country" name='country' placeholder="" value={city.country} onChange={handleOnChange}>
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
                    <p className='title required'><strong>City</strong></p>
                    <input type="text" className="form-control" id="city" name='city' placeholder="" value={city.city} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default CityForm