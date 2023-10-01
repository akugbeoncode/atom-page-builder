import React, { useState } from 'react'
import { capitalizeEachWord, processObjectKeyValue } from '../../../helpers/utils'

const SelectInputField = ({ parameter, sidebarObject, typeSettingsObject, updatePageElement }) => {
    const [value, setValue] = useState(sidebarObject.settings[parameter])

    const updateCurrentValue = async (newValue) => {
        const updatedUiElement = sidebarObject;
        updatedUiElement.settings[parameter] = newValue
        await updatePageElement(sidebarObject.id, updatedUiElement, "settings");
    }

    return (
        <div className="mb-3">
            <label className="form-label">{capitalizeEachWord(processObjectKeyValue(parameter))}</label>
            <select className="form-select"
                value={value ? value : ""}
                onChange={(e) => {
                    setValue(e.target.value)
                    updateCurrentValue(e.target.value)
                }}
            >
                {typeSettingsObject[parameter].options?.map((option, index)=>(<option key={index} value={option} >{option}</option>))}
            </select>
        </div>
    )
}

export default SelectInputField
