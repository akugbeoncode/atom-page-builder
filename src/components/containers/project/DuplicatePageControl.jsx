import React from 'react'
import { FaClone } from "react-icons/fa6";

const DuplicatePageControl = ({ handleShowRenderModalsRequest, setOpen }) => {

  const handleCreateNewPageFromExistingPageRequest = () => {
    handleShowRenderModalsRequest(true, "create-new-page-from-existing-page")
    setOpen(false)
  }

  return (
    <>
      <button onClick={handleCreateNewPageFromExistingPageRequest} className='create-pages-btn duplicate-page-btn'><FaClone fontSize={15} /></button>
    </>
  )
}

export default DuplicatePageControl
