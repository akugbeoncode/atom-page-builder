import React from 'react'
import PageListings from './PageListings'
import PageSettings from './PageSettings'
import BackToProject from './BackToProject'
import SavePage from './SavePage'

const PageManager = ({pages, activePage, setActivePage,  updatePageElementsCallback, updateActivePageSettings, setEdit, handleShowRenderModalsRequest, pageListingsOpen, setPageListingsOpen, pageSettingsOpen , setPageSettingsOpen, closeAllPanels, deletePage, saveActivePageAndElementsSettings }) => {
    return (
        <>
            <div className='sidebar-panel-controls-container'>
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
            </div>  
        </>
    )
}

export default PageManager
