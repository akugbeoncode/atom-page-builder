import React, { useEffect, useState } from 'react'
import { FaCogs } from "react-icons/fa";
import { getThemePatternByName, patterns, processThemePattern } from '../../../apis/pageThemes';

const PageSettings = ({ open, setOpen, closeAllPanels, page, updateActivePageSettings }) => {

  const initPatternTheme = page?.settings.usePattern ? getThemePatternByName(page?.settings.theme.name) : {name: "Solid Color", className: "", parameters: {"background": page?.settings.color}};
  const [color, setColor] = useState(page.settings.color);
  const [usePattern, setUsePattern] = useState(page.settings.usePattern);
  const [patternTheme, setPatternTheme] = useState(JSON.stringify(initPatternTheme));
  const [patternThemesOptions, setPatternThemesOptions] = useState(patterns);
  const [patterToStyle, setPatterToStyle] = useState(processThemePattern(JSON.parse(patternTheme), page?.settings.usePattern ? "Pattern" : "Solid Color"));

  const handleToggleRequest = () => {
    const prevOpenState  = open;
    closeAllPanels()
    setOpen(!prevOpenState)
  }

  const updatePatternToStyle = (pattern, type) => {
    const processedTheme = processThemePattern(JSON.parse(pattern), type)
    setPatterToStyle(processedTheme)
  }

  const handlePageColorChangeRequest = (e) => {
    setColor(e.target.value)
    if (!usePattern) {
      const solidColorTheme = {
          name: "Solid Color",
          className: "",
          parameters: {
              "background": e.target.value
          }
      }
      const stringifySolidColorTheme = JSON.stringify(solidColorTheme);
      setPatternTheme(stringifySolidColorTheme)
      updatePatternToStyle(stringifySolidColorTheme, "Solid Color")
    } 
  }

  const handleUsePatternCheckedRequest = (e) => {
    setUsePattern(e.currentTarget.checked)

    if (!e.currentTarget.checked) {
      const solidColorTheme = {
          name: "Solid Color",
          className: "",
          parameters: {
              "background": color
          }
      }
      const stringifySolidColorTheme = JSON.stringify(solidColorTheme);
      setPatternTheme(stringifySolidColorTheme)
      updatePatternToStyle(stringifySolidColorTheme, "Solid Color")
    }

    if (e.currentTarget.checked) {
      const pattern = JSON.stringify(patternThemesOptions[0])
      setPatternTheme(pattern)
      updatePatternToStyle(pattern, "Pattern")
    }
  }

  const handlePatternThemeChangedRequest = (e) => {
    const pattern = e.target.value.length > 0 ? e.target.value : JSON.stringify(patternThemesOptions[0]);
    setPatternTheme(pattern)
    updatePatternToStyle(pattern, "Pattern")
  }

  const handleSaveSettingRequest = () => {
    updateActivePageSettings({ theme: patterToStyle, usePattern: usePattern, color: color })
    handleToggleRequest()
  }

  // useEffect(()=> {
  //   updateActivePageSettings({
  //     theme: patterToStyle,
  //     usePattern: usePattern,
  //     color: color
  //   })
  //   // console.log(patterToStyle)
  // }, [color, usePattern, patternTheme])

  return (
    <div className='select-dropdown'>
        <div className='select-dropdown-btn' title='Active Page Settings' onClick={handleToggleRequest}><FaCogs fontSize={20} /></div>
        {open && (
            <div className='select-dropdown-content page-settings page-settings-mobile-panel'>
                <div className='select-dropdown-item no-hover'>
                    <h3 className='h5 text-center' style={{ fontSize: "18px", margin: "10px" }}>Page Settings</h3>
                </div>
                <div className='select-dropdown-item no-hover'>
                  <div className="my-2 mx-3 ">
                      <label className="form-label">Page Color</label>
                      <input type="color"
                          onChange={(e) => handlePageColorChangeRequest(e)} 
                          value={color}
                          className="form-control form-control-color" title="Choose your color" />
                  </div>
                </div>
                <div className='select-dropdown-item no-hover'>
                  <div className="form-check mx-3 mb-3">
                    <input className="form-check-input" type="checkbox"
                          checked={usePattern} 
                          value={usePattern} 
                          onChange={(e) => handleUsePatternCheckedRequest(e)}
                      />
                      <label className="form-check-label">
                          Use Pattern as Theme
                      </label>
                  </div>
                </div>

                {
                  usePattern &&

                  <div className='select-dropdown-item no-hover'>
                    <div className="mx-3 mb-3">
                    <label className="form-label">Pattern Theme</label>
                    <select className="form-select"
                        value={patternTheme ? patternTheme : ""}
                        onChange={(e)=>handlePatternThemeChangedRequest(e)}
                    >
                      {patternThemesOptions?.map((option, index)=>(<option key={index} value={JSON.stringify(option)} >{option.name}</option>))}
                    </select>
                    </div>
                  </div>
                }
                
                <div className='select-dropdown-item no-hover'>
                  <div className="mx-3 mb-3">
                    <label className="form-label">Theme Preview</label>
                    <div className='theme-preview-container' style={ patterToStyle.settings }></div>
                  </div>
                </div>
                <div className='select-dropdown-item no-hover text-center'>
                  <button onClick={handleSaveSettingRequest} className='btn btn-outline-success my-2 mx-2'>Save</button>
                  <button onClick={handleToggleRequest} className='btn btn-outline-danger my-2 mx-2'>Close</button>
                </div>
            </div>
        )}
    </div>
  )
}

export default PageSettings
