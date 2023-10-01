import React from 'react'
import { FaFloppyDisk } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const SavePage = ({ closeAllPanels, saveActivePageAndElementsSettings }) => {

  const handleSavePageRequest = () => {
    closeAllPanels()
    saveActivePageAndElementsSettings()
  }

  return (
    <div className='select-dropdown'>
        <div onClick={handleSavePageRequest} title="Save Active Page" className='select-dropdown-btn save-active-page'><FaFloppyDisk fontSize={20} /></div>
    </div>
  )
}

export default SavePage
