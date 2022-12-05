import '../assets/css/Form.css'
import React, { useContext, useEffect } from 'react'
import CountryContext from '../context/country/CountryContext'
import CityContext from '../context/city/CityContext'
import AreaContext from '../context/area/AreaContext'
import SubAreaContext from '../context/subarea/SubAreaContext'

const SubAreaForm = () => {
    const { subArea, setSubArea } = useContext(SubAreaContext)
    const { areas, getAllAreas } = useContext(AreaContext)
    const { countries, getAllCountries } = useContext(CountryContext)
    const { cities, getAllCities } = useContext(CityContext)

    useEffect(() => {
        getAllCountries('country', 'ASC', '')
        getAllCities('city', 'ASC', subArea.country, 'country')
        getAllAreas('area', 'ASC', subArea.city, 'city')
        // eslint-disable-next-line
    }, [subArea.country, subArea.city])

    const handleOnChange = (event) => {
        setSubArea({ ...subArea, [event.target.name]: event.target.value })
    }

    return (
        <div className='container form'>
            <form className="row g-2">
                <div className="col-md-12">
                    <p className='title'><strong>Country</strong></p>
                    <select className="form-select" id="country" name='country' placeholder="" value={subArea.country} onChange={handleOnChange}>
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
                    <select className="form-select" id="city" name='city' placeholder="" value={subArea.city} onChange={handleOnChange}>
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
                    <p className='title'><strong>Area</strong></p>
                    <select className="form-select" id="area" name='area' placeholder="" value={subArea.area} onChange={handleOnChange}>
                        <option defaultValue=""></option>
                        {areas.map((area) => {
                            return (
                                <option key={area.id} value={area.id}>{area.area}</option>
                            )
                        })}
                    </select>
                    <p className='label'></p>
                </div>

                <div className="col-md-12">
                    <p className='title required'><strong>Subarea</strong></p>
                    <input type="text" className="form-control" id="subarea" name='subarea' placeholder="" value={subArea.subarea} onChange={handleOnChange} ></input>
                    <p className='label'></p>
                </div>
            </form>
        </div>
    )
}

export default SubAreaForm;