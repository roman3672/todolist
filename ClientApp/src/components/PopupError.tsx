import React, {Dispatch, SetStateAction} from "react";
import '../styles/custom.scss'

interface IError {
    message?: string
    setPopupError: Dispatch<SetStateAction<boolean>>
}

const PopupError = ({message, setPopupError}: IError) => {
    return(
        <button className='popup-error' onClick={() => setPopupError(false)}>
            {message}
        </button>
    )
}

export default PopupError