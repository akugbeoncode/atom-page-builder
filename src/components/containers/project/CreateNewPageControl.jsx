import React from 'react'
import { IoMdAdd } from 'react-icons/io';

const CreateNewPageControl = ({ handleShowRenderModalsRequest, setOpen }) => {

  const handleCreateNewPageRequest = () => {
    handleShowRenderModalsRequest(true, "create-new-page")
    setOpen(false)
  }

  return (
    <>
      <button onClick={handleCreateNewPageRequest} className='create-pages-btn new-page-btn'><IoMdAdd fontSize={15} /> &nbsp; NEW PAGE</button>
    </>
  )
}

export default CreateNewPageControl
