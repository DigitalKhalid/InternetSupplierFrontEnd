import '../assets/css/Form.css'
import React, { useContext } from 'react'
import CountryContext from '../context/country/CountryContext'

const CountryForm = () => {
    const context = useContext(CountryContext)
    const { country, setCountry } = context

    const handleOnChange = (event) => {
        setCountry({ ...country, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-12">
                    <p className='title required'><strong>Country</strong></p>
                    <input type="text" className="form-control" id="country" name='country' placeholder="" value={country.country} onChange={handleOnChange} ></input>
                    {/* <p className='label'></p> */}
                </div>
            </form>
        </div>
    )
}

export default CountryForm