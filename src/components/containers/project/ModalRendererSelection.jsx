import React from 'react'
import CreateNewPage from './CreateNewPage'
import CreateNewPageFromExistingPage from './CreateNewPageFromExistingPage'

const ModalRendererSelection = ({ modalTypeLabel, setShowRenderModals, project, page, pageUiElements, updatePagesCallback }) => {

    if (modalTypeLabel.toLowerCase() === "create-new-page") {
        return (<CreateNewPage project={project} setShowRenderModals={setShowRenderModals} updatePagesCallback={updatePagesCallback} />)
    }
  
    if (modalTypeLabel.toLowerCase() === "create-new-page-from-existing-page") {
        return (<CreateNewPageFromExistingPage page={page} pageUiElements={pageUiElements} project={project} setShowRenderModals={setShowRenderModals} updatePagesCallback={updatePagesCallback} />)
    }
}

export default ModalRendererSelection
