import React from 'react'
import PageElementText from './PageElementText'
import PageElementImage from './PageElementImage'
import PageElementShape from './PageElementShape'

const PageElementRenderer = ({ element, edit, activePageElement, setActivePageElement, deletePageElement, updatePageElement, setShowSidebarPanel, setSidebarObject, setSidebarObjectTitle, closeAllPanels }) => {
    if (element.type === "text") {
        return (<PageElementText 
            element={element} 
            edit={edit} 
            activePageElement={activePageElement} 
            setActivePageElement={setActivePageElement} 
            deletePageElement={deletePageElement} 
            updatePageElement={updatePageElement} 
            setShowSidebarPanel={setShowSidebarPanel}
            setSidebarObject={setSidebarObject}
            setSidebarObjectTitle={setSidebarObjectTitle}
            closeAllPanels={closeAllPanels}
        />)
    }

    if (element.type === "image") {
        return (<PageElementImage 
            element={element} 
            edit={edit} 
            activePageElement={activePageElement} 
            setActivePageElement={setActivePageElement} 
            deletePageElement={deletePageElement} 
            setShowSidebarPanel={setShowSidebarPanel}
            setSidebarObject={setSidebarObject}
            setSidebarObjectTitle={setSidebarObjectTitle}
            closeAllPanels={closeAllPanels}
        />)
    }

    if (element.type === "shape") {
        return (<PageElementShape 
            element={element} 
            edit={edit} 
            activePageElement={activePageElement} 
            setActivePageElement={setActivePageElement} 
            deletePageElement={deletePageElement} 
            setShowSidebarPanel={setShowSidebarPanel}
            setSidebarObject={setSidebarObject}
            setSidebarObjectTitle={setSidebarObjectTitle}
            closeAllPanels={closeAllPanels}
        />)
    }
}

export default PageElementRenderer
