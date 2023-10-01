import React, { useEffect, useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import DuplicatePageControl from './DuplicatePageControl';
import CreateNewPageControl from './CreateNewPageControl';
import Swal from 'sweetalert2';

const PageListings = ({ pages, activePage, setActivePage, handleShowRenderModalsRequest, setOpen, open, closeAllPanels, deletePage }) => {
    const [currentValue, setCurrentValue] = useState(activePage);   

    const handleToggleRequest = () => {
        const prevOpenState = open;
        closeAllPanels()
        setOpen(!prevOpenState)
    }

    const handleClose = () => {  
        setOpen(false);
    };

    const handleChange = async (value) => {  
        localStorage.setItem("ACTIVE_PAGE", JSON.stringify(value))
        setActivePage(value)
        handleClose()
    };

    const handlePageDeleteRequest = (id, reference, name) => {
        Swal.fire({
            title: `Do you want to DELETE "${name}" page?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'DELETE',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deletePage(id, reference)
            }
        })
    }

    useEffect(()=>{
        setCurrentValue(activePage)
        // updatePageElementsCallback()
    }, [activePage])

    return (
        <div className='select-dropdown'>
            <div className='select-dropdown-btn' onClick={handleToggleRequest}><span>{currentValue?.name}</span> <FaChevronDown fontSize={10} /></div>
            {open && (
                <div className='select-dropdown-content page-manager-mobile-panel'>
                    <div className='select-dropdown-item'>
                        <button className='access-level-btn active'>PUBLIC</button>
                        <button className='access-level-btn'>PRIVATE</button>
                    </div>
                    {
                        pages?.map(page => (
                            <div 
                                className='select-dropdown-item padding-select-dropdown-item'
                                key={page.id}
                                onClick={()=>handleChange(page)}
                            >
                                <span>{ page?.name}</span> <button onClick={() => handlePageDeleteRequest(page.id, page.reference, page.name)} className='select-dropdown-item-delete-btn' style={{ height: "25px", width: "25px" }}><AiOutlineClose /></button>
                            </div>
                        ))
                    }
                    <div className='select-dropdown-item'>
                        <DuplicatePageControl handleShowRenderModalsRequest={handleShowRenderModalsRequest} setOpen={setOpen} />
                        <CreateNewPageControl handleShowRenderModalsRequest={handleShowRenderModalsRequest} setOpen={setOpen} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default PageListings
