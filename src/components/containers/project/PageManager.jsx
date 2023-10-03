import React, { useEffect, useState } from 'react'
import { FaX, FaBars } from "react-icons/fa6";
import PageListings from './PageListings'
import PageSettings from './PageSettings'
import BackToProject from './BackToProject'
import SavePage from './SavePage'
import { AuthData } from '../../auth/AuthWrapper'

const PageManager = ({pages, activePage, setActivePage,  updatePageElementsCallback, updateActivePageSettings, setEdit, handleShowRenderModalsRequest, pageListingsOpen, setPageListingsOpen, pageSettingsOpen , setPageSettingsOpen, closeAllPanels, deletePage, saveActivePageAndElementsSettings }) => {
    const { isMobileScreenView } = AuthData();
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        isMobileScreenView ? setOpen(false) : setOpen(false)
    }, [isMobileScreenView])
    
    return (
        <>
            <div className={`sidebar-panel-controls-container ${(isMobileScreenView && open) ? "open-mobile-menu-width" : ""} ${(isMobileScreenView && !open) ? "hidden-mobile-menu-width" : ""}`}>
                {
                    isMobileScreenView &&
                    <div>
                        <button className={`mobile-menu-btn ${open ? "open" : "close"}`} onClick={()=>setOpen(!open)} title={open ? "Minimize" : "Expand"}>
                            {
                                open ? <FaX fontSize={20} /> : <FaBars fontSize={20} />
                            }
                        </button>
                    </div>
                }

                {
                    open &&
                    <div style={{ minWidth: "250px", display: "flex", flexDirection: "row",  }}>
                        <PageListings 
                            pages={pages} 
                            activePage={activePage}
                            setActivePage={setActivePage}
                            handleShowRenderModalsRequest={handleShowRenderModalsRequest} 
                            open={pageListingsOpen}
                            setOpen={setPageListingsOpen}
                            closeAllPanels={closeAllPanels}
                            deletePage={deletePage}
                            updatePageElementsCallback={updatePageElementsCallback}
                        />
                        <PageSettings 
                            open={pageSettingsOpen}
                            setOpen={setPageSettingsOpen}
                            closeAllPanels={closeAllPanels}
                            updateActivePageSettings={updateActivePageSettings}
                            page={activePage}
                        />
                        <SavePage
                            closeAllPanels={closeAllPanels}
                            saveActivePageAndElementsSettings={saveActivePageAndElementsSettings}
                        />
                        <BackToProject setEdit={setEdit} closeAllPanels={closeAllPanels} saveActivePageAndElementsSettings={saveActivePageAndElementsSettings} />
                    </div>
                }
            </div>  
        </>
    )
}

export default PageManager
