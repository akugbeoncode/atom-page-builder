import React from 'react'
import { FaDesktop, FaMobileButton, FaArrowRightFromBracket } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { AuthData } from '../../auth/AuthWrapper';

const DesignOrientationManager = ({ showMobileOrientation, setShowMobileOrientation, setEdit, saveActivePageAndElementsSettings }) => {

    const { toggleScreenViewBetweenMobileAndWebView } = AuthData();

    const handleMobileViewRequested = (requestViewType) => {
        setShowMobileOrientation(true)
        toggleScreenViewBetweenMobileAndWebView(requestViewType)
    }

    const handleWebViewRequested = (requestViewType) => {
        setShowMobileOrientation(false)
        toggleScreenViewBetweenMobileAndWebView(requestViewType)
    }

    const handleExitEditModeRequest = () => {
        Swal.fire({
            title: `Do you want to SAVE current page?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Save',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                saveActivePageAndElementsSettings()
            } 
            const editObj = {
                user: "",
                edit: false
            }
            localStorage.setItem("EDIT_STATUS", JSON.stringify(editObj))
            setEdit(false)
        })
    }

    return (
        <>
            <div className='design-orientation-panel-controls-container'>
                { (window.innerWidth >= 992) &&
                    <div className='orientation-control'>
                        <div onClick={() => handleWebViewRequested("web")} className={`orientation-control-item ${!showMobileOrientation ? "active" : ""}`}><FaDesktop /></div>
                        <div onClick={() => handleMobileViewRequested("mobile")} className={`orientation-control-item ${showMobileOrientation ? "active" : ""}`}><FaMobileButton /></div>
                    </div>
                }
                <div onClick={handleExitEditModeRequest} title='Exit Edit Mode' className='orientation-control single-orientation-menu-item'> <FaArrowRightFromBracket /> </div>
            </div>
        </>
    )
}

export default DesignOrientationManager
