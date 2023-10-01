import React from 'react'
import SidebarEmpty from '../sidebar/SidebarEmpty'
import SidebarTextSettings from '../sidebar/SidebarTextSettings'
import SidebarImageSettings from '../sidebar/SidebarImageSettings'
import SidebarShapeSettings from '../sidebar/SidebarShapeSettings'

const Sidebar = ({ showSidebarPanel, setShowSidebarPanel, closeAllPanels, sidebarObject, sidebarObjectTitle, updatePageElement }) => {
    
    if (sidebarObjectTitle === "") {
        return (<SidebarEmpty 
            showSidebarPanel={showSidebarPanel}
            setShowSidebarPanel={setShowSidebarPanel}
            closeAllPanels={closeAllPanels}
            sidebarObject={sidebarObject}
            sidebarObjectTitle={sidebarObjectTitle}
        />)
    }

    if (sidebarObjectTitle === "Text Settings") {
        return (<SidebarTextSettings
            showSidebarPanel={showSidebarPanel}
            setShowSidebarPanel={setShowSidebarPanel}
            closeAllPanels={closeAllPanels}
            sidebarObject={sidebarObject}
            sidebarObjectTitle={sidebarObjectTitle}
            updatePageElement={updatePageElement}
        />)
    }

    if (sidebarObjectTitle === "Image Settings") {
        return (<SidebarImageSettings
            showSidebarPanel={showSidebarPanel}
            setShowSidebarPanel={setShowSidebarPanel}
            closeAllPanels={closeAllPanels}
            sidebarObject={sidebarObject}
            sidebarObjectTitle={sidebarObjectTitle}
            updatePageElement={updatePageElement}
        />)
    }
    
    if (sidebarObjectTitle === "Shape Settings") {
        return (<SidebarShapeSettings
            showSidebarPanel={showSidebarPanel}
            setShowSidebarPanel={setShowSidebarPanel}
            closeAllPanels={closeAllPanels}
            sidebarObject={sidebarObject}
            sidebarObjectTitle={sidebarObjectTitle}
            updatePageElement={updatePageElement}
        />)
    }
}

export default Sidebar
