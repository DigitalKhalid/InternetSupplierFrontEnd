import React, { useContext, useEffect } from 'react'
import './Popup.css'
import PopupContext from '../context/popup/PopupContext'

const Popup = (props) => {
    let { header, body, btnCancel = '', btnOk = 'Ok', btnOkClick, autoClose = false } = props

    const context = useContext(PopupContext)
    const { isOpen, togglePopup } = context

    useEffect(() => {
        if (isOpen === true && autoClose === true) {
            setTimeout(() => {
                togglePopup()
            }, 1500);
        }
    }, [isOpen])

    if (isOpen !== true) return null
    return (
        <>
            <div className="overlay" />
            <div className={isOpen?'popup open':'popup'}>
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
                        {btnCancel && <button className='btn btn-warning btn-sm' onClick={togglePopup}>{btnCancel}</button>}
                        <button className='btn btn-primary btn-sm' onClick={btnOkClick} >{btnOk}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Popup;