import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { slugify } from '../../../helpers/utils';
import { getPageNameValidity } from '../../../helpers/projectHelper';
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import Bars from 'react-loading-icons/dist/esm/components/bars';
import { v4 as uuidv4 } from 'uuid';
import { createPage } from '../../../apis/pages';

const CreateNewPage = ({ setShowRenderModals, project, updatePagesCallback }) => {
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

    const handleCreatePageRequested = async () => {
        setLoading(true)

        const pageObj = {
            project: project.reference,
            reference: uuidv4(),
            name: value,
            settings: {
                theme: {
                    type: "Solid Color",
                    name: "White Background",
                    settings: { "background": "#FFFFFF"}
                },
                usePattern: false,
                color: "#FFFFFF"
            }
        }

        await createPage(pageObj)
        updatePagesCallback()
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
                    <h3 className='text-center' style={{ padding: "40px 0 20px" }}>Create New Page</h3>
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
                            <button title={!isValidPageName ? "Button Disabled" : "Create Page"} type="button" disabled={!isValidPageName ? true : false}  onClick={handleCreatePageRequested} className="btn btn-primary">Create Page</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewPage
