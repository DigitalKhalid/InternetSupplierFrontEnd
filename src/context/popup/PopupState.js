import React, { useState } from 'react'
import PopupContext from './PopupContext'

const PopupState = (props) => {
    const [openPopup, setOpenPopup] = useState(false)

    const togglePopup = () => {
        setOpenPopup(!openPopup)
    }

    return (
        <PopupContext.Provider value={{ openPopup, togglePopup }}>
            {props.children}
        </PopupContext.Provider>
    )
}

export default PopupState