import React, { useContext } from 'react'
import './Popup.css'
import PopupContext from '../context/popup/PopupContext'

const Popup = (props) => {
    let { header, body, btnCancel, btnOk, btnOkClick } = props

    const context = useContext(PopupContext)
    const { openPopup, togglePopup } = context

    if (openPopup !== true) return null
    return (
        <>
            <div className="overlay" />
            <div className='popup'>
                <button className='popup-close-btn' onClick={togglePopup} ><i className='fa fa-xmark'></i></button>
                <div className="popup-content">
                    <div className="popup-header">
                        {header}
                    </div>
                    <hr />

                    <div className="popup-body">
                        {body}
                    </div>
                    <hr />

                    <div className="popup-footer">
                        <button className='btn btn-warning btn-sm' onClick={togglePopup}>{btnCancel}</button>
                        <button className='btn btn-primary btn-sm' onClick={{btnOkClick}} >{btnOk}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup;