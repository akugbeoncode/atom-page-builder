import React, { useState } from 'react'
import { BiText, BiSolidImage, BiSolidShapes, BiSolidPalette, BiDotsHorizontalRounded, BiCodeAlt, BiSolidGrid } from "react-icons/bi";
import ToolBoxMenuOptionsDisplayPanels from './ToolBoxMenuOptionsDisplayPanels';
import { getUiElementDefaultSettings } from '../../../apis/defaults';
import { v4 as uuidv4 } from 'uuid';
import { createPageElement } from '../../../apis/pageElements';
import { AuthData } from '../../auth/AuthWrapper';

const AddUIElementToPage = ({
	showUploadImagePanel, setShowUploadImagePanel, showShapeOptionsPanel, setShowShapeOptionsPanel, setShowIFrameContainerPanel, showIFrameContainerPanel, setShowSelectContainerOptionPanel, showSelectContainerOptionPanel, showMenuOptionsPanel, setShowMenuOptionsPanel, closeAllPanels, page, updatePageElementsCallback
}) => {

	const { windowDimensions } = AuthData();

	const handleAddTextUIElementRequest = async () => {
		closeAllPanels()

		const type = "text"

		const textUiElement = {
			reference: uuidv4(),
			page: page.reference,
			type: type,
			text: "Edit Text",
			settings: getUiElementDefaultSettings(type)
		}

		textUiElement.settings["x"] = parseInt((windowDimensions.winWidth/2)-(textUiElement.settings["width"]/2))
		textUiElement.settings["y"] = parseInt((windowDimensions.winHeight/2)-(textUiElement.settings["height"]/2))

		await createPageElement(textUiElement)
		updatePageElementsCallback()
	}

	const handleShowUploadImageUIElementRequest = () => {
		closeAllPanels()
		setShowUploadImagePanel(!showUploadImagePanel)
	}

	const handleShowAddShapeUIElementRequest = () => {
		closeAllPanels()
		setShowShapeOptionsPanel(!showShapeOptionsPanel)
	}

	const handleShowIFrameContainerPanel = () => {
		closeAllPanels()
		setShowIFrameContainerPanel(!showIFrameContainerPanel)
	}

	const handleSelectContainerOptionPanel = () => {
		closeAllPanels()
		setShowSelectContainerOptionPanel(!showSelectContainerOptionPanel)
	}

	const handleShowHiddenMenuOptionsRequest = () => {
		closeAllPanels()
		setShowMenuOptionsPanel(!showMenuOptionsPanel)
	}

    return (
      <>
		<div className='ui-element-toolbox-container'>
			<ul>
				<li 
					title='Add Text'
					onClick={handleAddTextUIElementRequest}
				><BiText fontSize={25} /></li>
				<li 
					title='Upload Image'
					onClick={handleShowUploadImageUIElementRequest}
				><BiSolidImage fontSize={25} /></li>
				<li 
					title='Add Shape'
					onClick={handleShowAddShapeUIElementRequest}
				><BiSolidShapes fontSize={25} /></li>
				<li 
					title='IFrame Link'
					onClick={handleShowIFrameContainerPanel}
				><BiCodeAlt fontSize={25} /></li>
				<li 
					title='Grid Layout Container'
					onClick={handleSelectContainerOptionPanel}
				><BiSolidGrid fontSize={25} /></li>
				<li 
					title='More Options'
					onClick={handleShowHiddenMenuOptionsRequest}
				><BiDotsHorizontalRounded fontSize={25} /></li>
			</ul>
		</div>
		{
			(showUploadImagePanel || showShapeOptionsPanel || showIFrameContainerPanel || showSelectContainerOptionPanel || showMenuOptionsPanel) &&

			<ToolBoxMenuOptionsDisplayPanels
				showUploadImagePanel={showUploadImagePanel} setShowUploadImagePanel={setShowUploadImagePanel}
				showShapeOptionsPanel={showShapeOptionsPanel} setShowShapeOptionsPanel={setShowShapeOptionsPanel}
				setShowIFrameContainerPanel={setShowIFrameContainerPanel} showIFrameContainerPanel={showIFrameContainerPanel}
				setShowSelectContainerOptionPanel={setShowSelectContainerOptionPanel} showSelectContainerOptionPanel={showSelectContainerOptionPanel}
				showMenuOptionsPanel={showMenuOptionsPanel} setShowMenuOptionsPanel={setShowMenuOptionsPanel} closeAllPanels={closeAllPanels}
				page={page} updatePageElementsCallback={updatePageElementsCallback}
			 />
		}
	  </>
    )
}

export default AddUIElementToPage
