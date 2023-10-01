import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import RenderSettingsParameterItem from './RenderSettingsParameterItem';
import { getUiElementSettingsOptions } from '../../../apis/defaults';

const SidebarTextSettings = ({ showSidebarPanel, setShowSidebarPanel, closeAllPanels, sidebarObject, sidebarObjectTitle, updatePageElement }) => {
  
  const [settingsParameters, setSettingsParameters] = useState(Object.keys(sidebarObject.settings))
  const [typeSettingsObject, setTypeSettingsObject] = useState(getUiElementSettingsOptions(sidebarObject.type.toLowerCase()))

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
                      <div className='title-btn-container move-backward'>
                          <span className='h5 text-white py-2'>{sidebarObjectTitle}</span>
                          {/* <small>Target ID: {sidebarObject.reference}</small> */}
                      </div>
                      <div className='sidebar-content-container settings-items'>
                          <ul>
                            {
                              settingsParameters.map((parameter, index) => (
                                <li key={index}>
                                  <RenderSettingsParameterItem 
                                    parameter={parameter}
                                    sidebarObject={sidebarObject}
                                    typeSettingsObject={typeSettingsObject}
                                    updatePageElement={updatePageElement}
                                  />
                                </li>
                              ))
                            }
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}

export default SidebarTextSettings
