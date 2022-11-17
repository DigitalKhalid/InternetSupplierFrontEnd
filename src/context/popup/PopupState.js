import React, { useState } from 'react'
import PopupContext from './PopupContext'

const PopupState = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const togglePopup = () => {
        setIsOpen(!isOpen)
    }

    return (
        <PopupContext.Provider value={{ isOpen, togglePopup }}>
            {props.children}
        </PopupContext.Provider>
    )
}

export default PopupState