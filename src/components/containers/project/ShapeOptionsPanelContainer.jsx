import React, { useState } from 'react'
import { shapes } from '../../../apis/shapes'
import { v4 as uuidv4 } from 'uuid';
import { createPageElement } from '../../../apis/pageElements';
import { AuthData } from '../../auth/AuthWrapper';
import { getUiElementDefaultSettings } from '../../../apis/defaults';

const ShapeOptionsPanelContainer = ({ showShapeOptionsPanel, setShowShapeOptionsPanel, closeAllPanels, page, updatePageElementsCallback }) => {

    const { windowDimensions } = AuthData();
    const [shapeOptions, setShapeOptions] = useState(shapes)

    const handleShapeSelectedRequest = async (shapeId) => {
        closeAllPanels()

        const type = "shape"

		const shapeUiElement = {
			reference: uuidv4(),
			page: page.reference,
			type: type,
			shapeId: shapeId,
			settings: getUiElementDefaultSettings(type)
		}

		shapeUiElement.settings["x"] = parseInt((windowDimensions.winWidth/2)-(shapeUiElement.settings["width"]/2))
		shapeUiElement.settings["y"] = parseInt((windowDimensions.winHeight/2)-(shapeUiElement.settings["height"]/2))

		await createPageElement(shapeUiElement)
		updatePageElementsCallback()
    }

    return (
        <div className='toolbox-option-menu-panel-container'>
            <ul className='menu-panel-three-grid'>
                {
                    shapeOptions.length > 0 &&

                    shapeOptions?.map((shape)=>(
                        <li
                            key={shape.id}
                            title={shape.name}
                            onClick={() => handleShapeSelectedRequest(shape.id) }
                        >{shape.icon}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ShapeOptionsPanelContainer
