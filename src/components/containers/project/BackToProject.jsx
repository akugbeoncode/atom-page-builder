import React from 'react'
import { FaHouseChimney } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BackToProject = ({ setEdit, closeAllPanels, saveActivePageAndElementsSettings }) => {
  const navigate = useNavigate();

  const handleBackToProjectsRequest = () => {
    closeAllPanels()

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
      localStorage.removeItem("ACTIVE_PAGE")
      setEdit(false)
      navigate("/my-projects", {replace: true})
    })

  }

  return (
    <div className='select-dropdown'>
        <div onClick={handleBackToProjectsRequest} title="Back to Projects" className='select-dropdown-btn back-to-project'><FaHouseChimney fontSize={20} /></div>
    </div>
  )
}

export default BackToProject
