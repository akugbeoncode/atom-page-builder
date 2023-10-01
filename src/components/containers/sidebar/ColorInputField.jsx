import React, { useState } from 'react'
import { capitalizeEachWord, processObjectKeyValue } from '../../../helpers/utils'

const ColorInputField = ({ parameter, sidebarObject, typeSettingsObject, updatePageElement }) => {

    const [value, setValue] = useState(sidebarObject.settings[parameter])

    const updateCurrentValue = async (newValue) => {
        const updatedUiElement = sidebarObject;
        updatedUiElement.settings[parameter] = newValue
        await updatePageElement(sidebarObject.id, updatedUiElement, "settings");
    }

    return (
        <div className="mb-3">
            <label className="form-label">{capitalizeEachWord(processObjectKeyValue(parameter))}</label>
            <input type="color"
                onChange={(e) => {
                    setValue(e.target.value)
                    updateCurrentValue(e.target.value)
                }} 
                value={value}
                className="form-control form-control-color" title="Choose your color" />
        </div>
    )
}

export default ColorInputField
