import React, { useContext, useEffect } from 'react'
import '../assets/css/Popup.css'
import PopupContext from '../context/popup/PopupContext'
import Alert from '../components/Alerts'

const Popup = (props) => {
    let { header, body, btnCancel = '', btnOk = 'Ok', btnOkClick, autoClose = false, alerts = true } = props

    const context = useContext(PopupContext)
    const { isOpen, togglePopup } = context

    useEffect(() => {
        if (isOpen === true && autoClose === true) {
            setTimeout(() => {
                togglePopup()
            }, 1500);
        }
        //   eslint-disable-next-line
    }, [isOpen])

    return (
        <>
            <div className={isOpen ? 'overlay open' : 'overlay'} />
            <div className={isOpen ? 'popup open' : 'popup'}>
                {btnCancel && <button className='popup-close-btn' onClick={togglePopup} ><i className='fa fa-xmark'></i></button>}
                <div className="popup-content">
                    <div className="popup-header">
                        {header}
                    </div>
                    <hr className='hr' />

                    <div className="popup-body">
                        {body}
                    </div>
                    {/* <hr className='hr' /> */}

                    <div className="popup-footer col-md-11">
                        {btnCancel && <button className='btn btn-warning btn-sm' onClick={togglePopup}>{btnCancel}</button>}
                        <button className='btn btn-primary btn-sm' onClick={btnOkClick} >{btnOk}</button>
                    </div>

                    {alerts && <div className='popup-alert'>
                        <hr className='hr' />
                        <div className="alert-content">
                            <Alert /> 
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Popup;