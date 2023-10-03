import React from 'react'
import ModalRendererSelection from './ModalRendererSelection'

const RenderModals = ({ modalTypeLabel, setShowRenderModals, project, page, pageUiElements, updatePagesCallback }) => {
    return (
        <div className='edit-project-modals'>
            <ModalRendererSelection 
                project={project} 
                page={page} 
                pageUiElements={pageUiElements} 
                modalTypeLabel={modalTypeLabel} 
                setShowRenderModals={setShowRenderModals} 
                updatePagesCallback={updatePagesCallback} 
            />
        </div>
    )
}

export default RenderModals
