import React from 'react'
import { FaChevronRight } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const SidebarEmpty = ({ showSidebarPanel, setShowSidebarPanel, closeAllPanels, sidebarObject, sidebarObjectTitle }) => {
    
    const handleToggleSidebar = () => {
        const prevSidebarState = showSidebarPanel;
        closeAllPanels()
        setShowSidebarPanel(!prevSidebarState)
    }

    return (
        <>
            <div className='sidebar-panel-btn-container'>
                <button
                    className='sidebar-panel-btn'
                    onClick={handleToggleSidebar}
                >
                    <FaChevronRight fontSize={35} />
                </button>
            </div>  
            <div className={showSidebarPanel ? "sidebar-panel active" : "sidebar-panel" }>
                <div style={{ position: "relative" }}>
                    <div className='sidebar-panel-container'>
                        <div className='close-btn-container'>
                            <button 
                                className='btn btn-outline-danger'
                                onClick={handleToggleSidebar}
                            ><AiOutlineClose /></button>
                        </div>
                        <div className='title-btn-container'>
                            <h3 className='h5 text-white py-2'>{sidebarObjectTitle}</h3>
                        </div>
                        <div className='sidebar-content-container'>
                            <div className='text-center empty-sidebar-text'>No Settings Parameter has been configured for updating.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SidebarEmpty
