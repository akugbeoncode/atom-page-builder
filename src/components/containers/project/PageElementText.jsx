import { useState, useEffect, useRef } from 'react';
import { Rnd } from "react-rnd";
import { AuthData } from '../../auth/AuthWrapper';
import { BsPencilSquare, BsFillGearFill, BsFillTrash3Fill, BsFillEyeSlashFill } from "react-icons/bs";

const PageElementText = ({ element, edit, activePageElement, setActivePageElement, deletePageElement, updatePageElement, setShowSidebarPanel, setSidebarObject, setSidebarObjectTitle, closeAllPanels }) => {
    const { windowDimensions, isMobileScreenView } = AuthData();
    
    const [deltaPosition, setDeltaPosition] = useState({x: element.settings.x, y: element.settings.y});
    const [size, setSize] = useState({width: element.settings.width, height: element.settings.height});
    const [text, setText] = useState(element.text)
    const [textEditMode, setTextEditMode] = useState(false)
    const [showContextMenu, setShowContextMenu] = useState(true)
    const [thisIsActiveElement, setThisIsActiveElement] = useState(activePageElement?.reference === element.reference ? true : false )
    
    const handleDeletePageElementRequest = () => {
        closeAllPanels()
        setActivePageElement(null)
        deletePageElement(element.id)
    }

    const handleShowElementSettingsRequest = () => {
        closeAllPanels()
        setSidebarObject(null)
        setSidebarObjectTitle("")
        setTimeout(()=>{
            setSidebarObject(element)
            setSidebarObjectTitle("Text Settings")
            setShowSidebarPanel(true)
        }, 1)
    }

    const onResizeStop = async (e, direction, ref, delta, position) => {
        if (ref.style.width && ref.style.height) {
            setSize({width: parseInt(ref.style.width, 10), height: parseInt(ref.style.height, 10)})
            // console.log(size)
            await updateSizeSettings()
        }
    }

    const onDragStop = async (e, d) => {

        if (d.x && d.y) {
            setDeltaPosition({x: d.x, y: d.y})
            // console.log(deltaPosition)
            await updatePositionSettings()
        }
    };

    const onMouseMove = (e) => {
        if (edit) {
            if (isMobileScreenView) {
                e.target.style.cursor = "pointer";
            } else {
                const delta = 5;
                const rect = e.target.getBoundingClientRect();
                let x = e.clientX - rect.left,
                    y = e.clientY - rect.top,
                    w = rect.right - rect.left,
                    h = rect.bottom - rect.top;
    
                let c = "";
                if(y < delta) c += "n";
                else if( y > (h-delta)) c += "s";
    
                if(x < delta) c += "w";
                else if(x > (w - delta)) c += "e";
    
                if (c) {
                    const resizeMouseActionLabel =  c + "-resize";
                    e.target.style.cursor = resizeMouseActionLabel;
                } else {
                    const moveMouseActionLabel =  "move";
                    e.target.style.cursor = moveMouseActionLabel;
                }
            }
            handleOnClickRequested(e)
        } 
    }

    const onMouseMoveContextMenu = (e) => {
        e.target.style.cursor = "pointer";
    }

    const updateSizeSettings = async () => {
        const updatedUiElement = element;
        updatedUiElement.settings.width = size.width
        updatedUiElement.settings.height = size.height
        // handleUIElementUpdateRequest(updatedUiElement, "settings");
    }

    const updatePositionSettings = async () => {
        const updatedUiElement = element;
        updatedUiElement.settings.x = deltaPosition.x
        updatedUiElement.settings.y = deltaPosition.y
        // handleUIElementUpdateRequest(updatedUiElement, "settings");
    }

    const  handleUIElementUpdateRequest = async (update, props) => {
        if (!edit) return null;
        await updatePageElement(element.id, update, props)
    }

    const handleOnBlurRequest = () => {
        if (!edit) return null;
        setTextEditMode(false)
        const updatedUiElement = element;
        updatedUiElement.text = text
        handleUIElementUpdateRequest(updatedUiElement, "text");
    }

    const handleTextUpdateRequested = async (e) => {
        if (!edit) return null;
        setText(e.target.value)
    }

    const handleOnClickRequested = (e) => {
        if (!edit) return null;
        setActivePageElement(element)
        setShowContextMenu(true)
        if (activePageElement?.reference === element.reference) {
            setThisIsActiveElement(true)
        } else {
            setThisIsActiveElement(false)
        }
    }

    const handleOnDoubleClickRequested = (e) => {
        if (!edit) return null;
        setTextEditMode(true)
        setShowContextMenu(true)
        if (e.target.tagName === "INPUT") {
            e.target.focus()
        } else {
            document.querySelector(".text-element-rendered").focus()
        }
    }

    useEffect(() => {
        if (activePageElement?.reference === element.reference) {
            setThisIsActiveElement(true)
        } else {
            setThisIsActiveElement(false)
        }
    }, [activePageElement])

    return (
        <>
            <Rnd
                default={{
                    x: deltaPosition.x,
                    y: deltaPosition.y,
                    width: size.width,
                    height: size.height
                }}
                onDrag={onDragStop}
                onResize={onResizeStop}
                disableDragging={!edit}
                enableResizing={edit}
            >
                <div 
                    className={`text-element-rendered-container ${textEditMode ? "focused" : "" } ${(edit && thisIsActiveElement) ? "active" : "not-active" }`} 
                    style={{ position: "relative", height: `100%`, width: `$100%` }}
                    onClick={(e) => handleOnClickRequested(e)}
                    onDoubleClick={(e) => handleOnDoubleClickRequested(e)}
                    onMouseMove={onMouseMove}
                    onMouseUpCapture={(e) => handleOnClickRequested(e)}
                >
                    <input
                        className={`text-element-rendered`}
                        type='text' 
                        onClick={(e) => handleOnClickRequested(e)}
                        onDoubleClick={(e) => handleOnDoubleClickRequested(e)}
                        onBlur={(e) => handleOnBlurRequest()}
                        value={text}
                        onChange={(e)=>handleTextUpdateRequested(e)}
                        readOnly={!textEditMode ? true : false}
                        style={{ 
                            fontSize: `${element.settings["font-size"]}px`,
                            fontFamily: `${element.settings["font-family"]}`,
                            color: `${element.settings["color"]}`,
                            fontWeight: `${element.settings["font-weight"]}`
                        }}
                    />

                    {
                        ( edit && thisIsActiveElement && showContextMenu) &&
                        <div 
                            style={{ background: "#FFF"}}
                            className={`text-element-container-context-menu ${deltaPosition.y > 450 ? "top-context-renderer": "bottom-context-renderer"}`}
                        >
                            <div>
                                <ul>
                                    <li 
                                        onMouseMove={onMouseMoveContextMenu}
                                        title='Edit Text'
                                        onClick={handleOnDoubleClickRequested}
                                    ><BsPencilSquare onMouseMove={onMouseMoveContextMenu} /> </li>
                                    <li 
                                        onMouseMove={onMouseMoveContextMenu}
                                        onClick={handleShowElementSettingsRequest}
                                        title="Text Settings"
                                    ><BsFillGearFill onMouseMove={onMouseMoveContextMenu} /></li>
                                    <li 
                                        onMouseMove={onMouseMoveContextMenu}
                                        title="Delete Text"
                                        onClick={handleDeletePageElementRequest}
                                    ><BsFillTrash3Fill /></li>
                                    <li 
                                        onMouseMove={onMouseMoveContextMenu}
                                        title='Hide Context Meneu'
                                        onClick={()=>{setShowContextMenu(false); console.log("CLICKED!!!!!")}}
                                    ><BsFillEyeSlashFill /></li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </Rnd>
        </>
    )
}

export default PageElementText
