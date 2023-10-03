import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthData } from '../../auth/AuthWrapper';
import Sidebar from '../project/Sidebar';
import PageManager from '../project/PageManager';
import { fetchProjectByProps } from '../../../apis/projects';
import { deletePageAndAllUiElements, fetchProjectPages } from '../../../apis/pages';
import DesignOrientationManager from '../project/DesignOrientationManager';
import AddUIElementToPage from '../project/AddUIElementToPage';
import EnableEditMode from '../project/EnableEditMode';
import RenderModals from '../project/RenderModals';
import { fetchActivePageElements } from '../../../apis/pageElements';
import MobileGuideUIComponent from '../project/MobileGuideUIComponent';
import PageElementRenderer from '../project/PageElementRenderer';
import { validEditStatus } from '../../../helpers/utils';
import Swal from 'sweetalert2';


const Project = () => {
    const mainContentPageHolder = document.querySelector("#main-page-container");
    const editStatus = localStorage.getItem("EDIT_STATUS") ? JSON.parse(localStorage.getItem("EDIT_STATUS")) : null;
    const { projectRef } = useParams();
    const { setProjectRef, user, mobileGuideWidth, isMobileScreenView } = AuthData();
    const [edit, setEdit] = useState(validEditStatus(editStatus, user) ? editStatus.edit : false);
    const [project, setProject] = useState(null);
    const [pages, setPages] = useState([]);
    const [pageUiElements, setPageUiElements] = useState([])
    const [activePage, setActivePage] = useState(localStorage.getItem("ACTIVE_PAGE") ? JSON.parse(localStorage.getItem("ACTIVE_PAGE")) : null);
    const [showSidebarPanel, setShowSidebarPanel] = useState(false);
    const [showPageMangerPanel, setShowPageMangerPanel] = useState(false);
    const [projectUpdated, setProjectUpdated] = useState(false);
    const [showMobileOrientation, setShowMobileOrientation] = useState(false);
    const [showRenderModals, setShowRenderModals] = useState(false);
    const [modalTypeLabel, setModalTypeLabel] = useState("");
    const [showUploadImagePanel, setShowUploadImagePanel] = useState(false);
    const [showShapeOptionsPanel, setShowShapeOptionsPanel] = useState(false);
    const [showIFrameContainerPanel, setShowIFrameContainerPanel] = useState(false);
    const [showSelectContainerOptionPanel, setShowSelectContainerOptionPanel] = useState(false);
    const [showMenuOptionsPanel, setShowMenuOptionsPanel] = useState(false);
    const [pageListingsOpen, setPageListingsOpen]  = useState(false);
    const [pageSettingsOpen, setPageSettingsOpen]  = useState(false);
    const [activePageElement, setActivePageElement] = useState(null);
    const [sidebarObject, setSidebarObject] = useState(null);
    const [sidebarObjectTitle, setSidebarObjectTitle] = useState("");
    
    const hostname = process.env.REACT_APP_ENV === "development" ? "localhost:5000" : "json-server-rbhf.onrender.com";
    const protocolType = process.env.REACT_APP_ENV === "development" ? "http" : "https";

    const closeAllPanels = () => {
		setShowUploadImagePanel(false);
		setShowShapeOptionsPanel(false);
        setShowIFrameContainerPanel(false);
        setShowSelectContainerOptionPanel(false);
		setShowMenuOptionsPanel(false);
        setShowSidebarPanel(false);
        setShowPageMangerPanel(false);
        setShowMobileOrientation(false);
        setShowRenderModals(false);
        setPageListingsOpen(false);
        setPageSettingsOpen(false);
	}
    
    const saveActivePageAndElementsSettings = async () => {
        pageUiElements.forEach(async (element) => {
            updatePageElement(element.id, element, "settings")
        })
    }

    const handleShowRenderModalsRequest = (modalStateBool, modalType) => {
        setModalTypeLabel(modalType)
        setShowRenderModals(modalStateBool)
    }

    const fetchCurrentProject = async (slug) => {
        const projectFromServer = await fetchProjectByProps("slug", slug);
        setProject(projectFromServer);
    }

    const fetchCurrentProjectPages = async (projectRef) => {
        if (!projectRef) {
            setPages([])
            return null;
        }
        const pagesFromServer = await fetchProjectPages(projectRef);
        setPages(pagesFromServer)
        if (!activePage) {
            const stringifyPage = JSON.stringify(pagesFromServer[0]);
            localStorage.setItem("ACTIVE_PAGE", stringifyPage)
            setActivePage(pagesFromServer[0])
        }
    }

    const fetchActivePageUiElements = async (pageRef) => {
        const pageUiElementsFromServer = await fetchActivePageElements(pageRef);
        setPageUiElements(pageUiElementsFromServer)
        setActivePageElement(null)
    }

    const canEditProject = () => {
        return user?.reference === project?.owner ? true : false;
    }

    const updatePagesCallback = () => {
        fetchCurrentProjectPages(project?.reference)
    }

    const updatePageElementsCallback = async () => {
        await fetchActivePageUiElements(activePage?.reference)
    }

    const deletePage = async (pageId, pageRef) => {
        if (pages.length === 1) {
            Swal.fire({ title: 'Oops!', text: 'You are not allowed to DELETE the only page on your project.', icon: 'info'})
            return null;
        }

        if (activePage.id === pageId) {
            pages.forEach(pg => {
                if (pg.id !== pageId) {
                    setActivePage(pg);
                    return;
                }
            })
        }

        await deletePageAndAllUiElements(pageId, pageRef)
        updatePagesCallback()
    }

    const deletePageElement = async (pageElementId) => {

        await fetch(`${protocolType}://${hostname}/pageElements/${pageElementId}`, {
            method: "DELETE"
        })

        updatePageElementsCallback()
    }

    const pageUpdated = async (id, update,) => {
        try {
            const res = await fetch(`${protocolType}://${hostname}/pages/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(update)
            })

            const data = await res.json()
            
            setPages(
                pages.map((page) => page.id === id ? { ...page, settings: data["settings"] } : page )
            )
        } catch(err) {}
    }

    const updatePageElement = async (id, update, props) => {
        try {
            const res = await fetch(`${protocolType}://${hostname}/pageElements/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(update)
            })

            const data = await res.json()

            if (props === "settings") {
                setPageUiElements(
                    pageUiElements.map((element) => element.id === id ? { ...element, settings: data[props] } : element )
                )
            }
            
            if (props === "text") {
                setPageUiElements(
                    pageUiElements.map((element) => element.id === id ? { ...element, text: data[props] } : element )
                )
            } 
            updatePageElementsCallback()
        } catch(err) {}
    }

    const handleEmptyClickRequest = (e) => {
        if (e.target.classList.contains("main-application-layout")) {
            setActivePageElement(null)
            closeAllPanels()
        }
    }

    const updateActivePageSettings = async(pageSettingUpdate) => {
        const pageUpdate = activePage;
        pageUpdate.settings = pageSettingUpdate;
        await pageUpdated(pageUpdate.id, pageUpdate)
    }

    useEffect(()=>{
        setProjectRef(projectRef)
    }, [])

    useEffect(() =>{   
        fetchCurrentProject(projectRef)
    }, [projectRef])

    useEffect(() =>{   
        updatePagesCallback()
    }, [project, projectUpdated])

    useEffect(() =>{  
        fetchActivePageUiElements(activePage?.reference) 
        saveActivePageAndElementsSettings()
    }, [activePage])

    return (
        <div className="container-fluid" style={{ width: "100%", height: "1000px", minHeight: `1000px` }} id="main-page-container">
			<div style={activePage ? {...activePage.settings.theme.settings, ...{ width: "100%", height: "100%" }} : { width: "100%", height: "100%" }}>
                <div onClick={handleEmptyClickRequest} className={`main-application-layout ${isMobileScreenView && window.innerWidth >= 992 ? "rendered-mobile-screen" : "full-screen-width"}`} style={{ position: "relative", backgroundColor: "transparent" }}>
                    {
                        pageUiElements.map(pageUiElement=>(
                            <PageElementRenderer 
                                element={pageUiElement} 
                                edit={edit} 
                                activePageElement={activePageElement}
                                setActivePageElement={setActivePageElement}
                                key={pageUiElement.reference} 
                                deletePageElement={deletePageElement}
                                updatePageElement={updatePageElement}
                                setShowSidebarPanel={setShowSidebarPanel}
                                setSidebarObject={setSidebarObject}
                                setSidebarObjectTitle={setSidebarObjectTitle}
                                closeAllPanels={closeAllPanels}
                            />
                        ))
                    }
                </div>

                { (edit && !isMobileScreenView && pageUiElements.length > 0) && 
                    <MobileGuideUIComponent mobileGuideWidth={mobileGuideWidth}  left={"0"} right={""} />
                }

                { (edit && !isMobileScreenView && pageUiElements.length > 0) && 
                    <MobileGuideUIComponent mobileGuideWidth={mobileGuideWidth}  left={""} right={"0"} />
                }

                { edit && 
                    <Sidebar 
                        showSidebarPanel={showSidebarPanel} 
                        setShowSidebarPanel={setShowSidebarPanel} 
                        closeAllPanels={closeAllPanels}
                        sidebarObject={sidebarObject}
                        sidebarObjectTitle={sidebarObjectTitle}
                        updatePageElement={updatePageElement}
                    />
                }

                { edit && 
                    <PageManager 
                        handleShowRenderModalsRequest={handleShowRenderModalsRequest} 
                        setEdit={setEdit} showPageMangerPanel={showPageMangerPanel} 
                        setShowPageMangerPanel={setShowPageMangerPanel} 
                        pages={pages} 
                        currentActivePage={activePage} 
                        onChange={setActivePage} 
                        pageListingsOpen={pageListingsOpen}
                        setPageListingsOpen={setPageListingsOpen}
                        pageSettingsOpen={pageSettingsOpen}
                        setPageSettingsOpen={setPageSettingsOpen}
                        closeAllPanels={closeAllPanels}
                        deletePage={deletePage}
                        saveActivePageAndElementsSettings={saveActivePageAndElementsSettings}
                        activePage={activePage}
                        setActivePage={setActivePage}
                        updatePageElementsCallback={updatePageElementsCallback}
                        updateActivePageSettings={updateActivePageSettings}
                        fetchActivePageUiElements={fetchActivePageUiElements}
                    />
                }

                { edit && 
                    <DesignOrientationManager 
                        setEdit={setEdit} 
                        showMobileOrientation={showMobileOrientation} 
                        setShowMobileOrientation={setShowMobileOrientation} 
                        closeAllPanels={closeAllPanels}
                        saveActivePageAndElementsSettings={saveActivePageAndElementsSettings}
                    />
                }

                { edit && 
                    <AddUIElementToPage 
                        showMobileOrientation={showMobileOrientation} 
                        setShowMobileOrientation={setShowMobileOrientation} 
                        setShowUploadImagePanel={setShowUploadImagePanel} 
                        showUploadImagePanel={showUploadImagePanel}
                        setShowShapeOptionsPanel={setShowShapeOptionsPanel} 
                        showShapeOptionsPanel={showShapeOptionsPanel}
                        setShowIFrameContainerPanel={setShowIFrameContainerPanel} 
                        showIFrameContainerPanel={showIFrameContainerPanel}
                        setShowSelectContainerOptionPanel={setShowSelectContainerOptionPanel} 
                        showSelectContainerOptionPanel={showSelectContainerOptionPanel}
                        setShowMenuOptionsPanel={setShowMenuOptionsPanel} showMenuOptionsPanel={showMenuOptionsPanel}
                        closeAllPanels={closeAllPanels}
                        page={activePage} 
                        updatePageElementsCallback={updatePageElementsCallback}
                    />
                }

                { (!edit) && 
                    <EnableEditMode setEdit={setEdit} canEditProject={canEditProject()}/>
                }

                { (edit && canEditProject() && showRenderModals) &&
                    <RenderModals 
                        updatePagesCallback={updatePagesCallback} 
                        project={project}
                        page={activePage} 
                        pageUiElements={pageUiElements}
                        modalTypeLabel={modalTypeLabel} 
                        setShowRenderModals={setShowRenderModals} 
                        closeAllPanels={closeAllPanels} 
                    />
                }
            </div>
		</div>
    )
}

export default Project
