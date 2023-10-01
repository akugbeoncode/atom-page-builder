import React from 'react'
import UploadImagePanelContainer from './UploadImagePanelContainer'
import ShapeOptionsPanelContainer from './ShapeOptionsPanelContainer'
import LayoutContainerOptionsPanelContainer from './LayoutContainerOptionsPanelContainer'
import IFrameContainerPanelContainer from './IFrameContainerPanelContainer'
import OtherMenuOptionsPanelContainer from './OtherMenuOptionsPanelContainer'

const ToolBoxMenuOptionsDisplayPanels = ({ 
    showUploadImagePanel, setShowUploadImagePanel, showShapeOptionsPanel, setShowShapeOptionsPanel, setShowIFrameContainerPanel, showIFrameContainerPanel, setShowSelectContainerOptionPanel, showSelectContainerOptionPanel,
    showMenuOptionsPanel, setShowMenuOptionsPanel, closeAllPanels, page, updatePageElementsCallback
}) => {
    if (showUploadImagePanel) {
        return (<UploadImagePanelContainer 
            showUploadImagePanel={showUploadImagePanel}  
            setShowUploadImagePanel={setShowUploadImagePanel}  
            closeAllPanels={closeAllPanels}
            page={page} 
            updatePageElementsCallback={updatePageElementsCallback}
        />)
    }

    if (showShapeOptionsPanel) {
        return (<ShapeOptionsPanelContainer 
            showShapeOptionsPanel={showShapeOptionsPanel}  
            setShowShapeOptionsPanel={setShowShapeOptionsPanel}  
            closeAllPanels={closeAllPanels} 
            page={page} 
            updatePageElementsCallback={updatePageElementsCallback}
        />)
    }

    if (showIFrameContainerPanel) {
        return (<IFrameContainerPanelContainer 
            setShowIFrameContainerPanel={setShowIFrameContainerPanel}  
            showIFrameContainerPanel={showIFrameContainerPanel}  
            closeAllPanels={closeAllPanels}
            page={page} 
            updatePageElementsCallback={updatePageElementsCallback}
        />)
    }

    if (showSelectContainerOptionPanel) {
        return (<LayoutContainerOptionsPanelContainer 
            setShowSelectContainerOptionPanel={setShowSelectContainerOptionPanel}  
            showSelectContainerOptionPanel={showSelectContainerOptionPanel}  
            closeAllPanels={closeAllPanels}
            page={page} 
            updatePageElementsCallback={updatePageElementsCallback}
        />)
    }

    if (showMenuOptionsPanel) {
        return (<OtherMenuOptionsPanelContainer 
            showMenuOptionsPanel={showMenuOptionsPanel}  
            setShowMenuOptionsPanel={setShowMenuOptionsPanel}  
            closeAllPanels={closeAllPanels}
            page={page} 
            updatePageElementsCallback={updatePageElementsCallback}
        />)
    }
}

export default ToolBoxMenuOptionsDisplayPanels
