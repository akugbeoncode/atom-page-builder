import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { slugify } from '../../../helpers/utils';
import { getPageNameValidity } from '../../../helpers/projectHelper';
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import Bars from 'react-loading-icons/dist/esm/components/bars';
import { v4 as uuidv4 } from 'uuid';
import { createPage } from '../../../apis/pages';

const CreateNewPageFromExistingPage = ({ setShowRenderModals, project, page, pageUiElements, updatePagesCallback }) => {

    const [value, setValue] = useState("")
    const [isValidPageName, setIsValidPageName] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleOnChangeRequested = async (e) => {
        const pageName = slugify(e.target.value);
        const valid = await getPageNameValidity(pageName, project.reference)
        setValue(pageName);
        setIsValidPageName(valid)
    }
    
    const handleCloseModalRequest = () => {
        setShowRenderModals(false)
    }

    const handleDivClick = () => {
        document.getElementById("page-name-input").focus()
    }

    const doNothing = () => {}

    const handleDuplicatePageRequested = async () => {
        setLoading(true)

        const pageObj = page;
        pageObj["reference"] = uuidv4();
        pageObj["name"]  = value;

        delete pageObj.id;

        await createPage(pageObj)
        updatePagesCallback()

        pageUiElements.forEach(async (uiElement, index)=>{
            console.log("pageUiElements " + index)
        })

        setLoading(false)
        setShowRenderModals(false)
    }

    return (
        <div className='create-new-page-form modal-view-area-border'>
            <div className='container-fluid'>
                <div style={{ position: "relative"}}>
                    <div style={{ position: "absolute", top: "10px", right: "0" }}>
                        <button onClick={handleCloseModalRequest} className='btn btn-outline-danger'><AiOutlineClose /></button>
                    </div>
                    <h3 className='text-center' style={{ padding: "40px 0 20px" }}>Duplicate Page</h3>
                    <div className="mb-3 px-3">
                        <label className="form-label">Page Name</label>
                        <div className='page-creation-text-area'>
                            <div style={{ cursor: "pointer" }} onClick={handleDivClick}>{`${project.slug}.`}</div>
                            <input id="page-name-input" className="" value={value} onChange={e=>handleOnChangeRequested(e)} />
                            { (value && isValidPageName) &&
                                <div className='page-validator-label'><BsFillCheckCircleFill style={{ color: "#0f5132" }} /> <span style={{fontSize: '10px', color: "#0f5132"}}>Available</span></div>
                            }

                            { (value && !isValidPageName) &&
                                <div className='page-validator-label'><BsXCircleFill style={{ color: "#842029" }} /> <span style={{fontSize: '10px', color: "#842029"}}>Not Available</span></div>
                            }
                        </div>
                    </div>
                    <div className="mb-5 text-center">
                        { loading ? 
                            <button type="button" onClick={()=>doNothing()} className="btn btn-primary"><Bars height={25} width={35} /></button> :
                            <button title={!isValidPageName ? "Button Disabled" : "Create Page"} type="button" disabled={!isValidPageName ? true : false}  onClick={handleDuplicatePageRequested} className="btn btn-primary">Duplicate Page</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewPageFromExistingPage
