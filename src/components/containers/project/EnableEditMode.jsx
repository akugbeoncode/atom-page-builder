import React from 'react'
import { FaPenToSquare, FaHouseChimney } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../../auth/AuthWrapper';

const EnableEditMode = ({ setEdit, canEditProject }) => {
    const navigate = useNavigate();
    const { user } = AuthData();

    const handleBackToProjectsRequest = () => {
        if (canEditProject) {
            navigate("/my-projects", {replace: true})
        } else {
            navigate("/", {replace: true})
        }
        localStorage.removeItem("ACTIVE_PAGE")
    }

    const handleEnableEditRequest = () => {
        const editObj = {
            user: user.reference,
            edit: true
        }
        localStorage.setItem("EDIT_STATUS", JSON.stringify(editObj))
        setEdit(true)
    }

    return (
        <>
            <div className='design-orientation-panel-controls-container'>
                <div onClick={handleBackToProjectsRequest} title="Back to Projects" className='orientation-control single-orientation-menu-item'> <FaHouseChimney fontSize={20} /> </div>
                {
                    canEditProject &&
                    <div onClick={handleEnableEditRequest} title='Enable Edit Mode' className='orientation-control single-orientation-menu-item edit-btn'> <FaPenToSquare /> &nbsp; EDIT </div>
                }
            </div>
        </>
    )
}

export default EnableEditMode
