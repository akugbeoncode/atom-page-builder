import React, { useState } from 'react'
import { capitalizeEachWord, processObjectKeyValue } from '../../../helpers/utils'

const NumberInputField = ({ parameter, sidebarObject, typeSettingsObject, updatePageElement }) => {
    const [value, setValue] = useState(sidebarObject?.settings[parameter])

    const updateCurrentValue = async (newValue) => {
        const updatedUiElement = sidebarObject;
        updatedUiElement.settings[parameter] = newValue
        await updatePageElement(sidebarObject.id, updatedUiElement, "settings");
    }

    const onChange = (e) => {
        const re = /^[0-9\b]+$/;

        if (e.target.value === '' || e.target.value === '0' || re.test(e.target.value)) {
            let val = 0
            if (e.target.value === '') {
                val = 0
            } else {
                val = parseInt(e.target.value, 10)
            }
            
            if (typeSettingsObject[parameter].range.max < val) {
                setValue(typeSettingsObject[parameter].range.max)
                updateCurrentValue(typeSettingsObject[parameter].range.max)
            } else if (typeSettingsObject[parameter].range.min > val) {
                setValue(typeSettingsObject[parameter].range.min)
                updateCurrentValue(typeSettingsObject[parameter].range.min)
            } else {
                setValue(val)
                updateCurrentValue(val)
            }
        }
    }

    return (
        <div className="mb-3">
            <label className="form-label">{capitalizeEachWord(processObjectKeyValue(parameter))}</label>
            <input type="number" 
                onChange={onChange} 
                value={value}
                min={typeSettingsObject[parameter].range.min}
                max={typeSettingsObject[parameter].range.max}
                className="form-control"  placeholder={`Enter ${capitalizeEachWord(processObjectKeyValue(parameter))}`} />
        </div>
    )
}

export default NumberInputField
