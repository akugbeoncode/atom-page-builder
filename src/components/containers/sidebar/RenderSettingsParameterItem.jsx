import React from 'react'
import ColorInputField from './ColorInputField'
import NumberInputField from './NumberInputField'
import SelectInputField from './SelectInputField'

const RenderSettingsParameterItem = ({ parameter, sidebarObject, typeSettingsObject, updatePageElement }) => {
  
    if (typeSettingsObject[parameter]["type"] === "number") {
        return (<NumberInputField 
            parameter={parameter} 
            sidebarObject={sidebarObject} 
            typeSettingsObject={typeSettingsObject} 
            updatePageElement={updatePageElement}
        />)
    }

    if (typeSettingsObject[parameter]["type"] === "select") {
        return (<SelectInputField 
            parameter={parameter} 
            sidebarObject={sidebarObject} 
            typeSettingsObject={typeSettingsObject} 
            updatePageElement={updatePageElement}
        />)
    }

    if (typeSettingsObject[parameter]["type"] === "color") {
        return (<ColorInputField 
            parameter={parameter} 
            sidebarObject={sidebarObject} 
            typeSettingsObject={typeSettingsObject} 
            updatePageElement={updatePageElement}
        />)
    }
}

export default RenderSettingsParameterItem
