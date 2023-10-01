import React, { useState } from 'react'
import { menus } from '../../../apis/menus'

const OtherMenuOptionsPanelContainer = ({ showMenuOptionsPanel, setShowMenuOptionsPanel, closeAllPanels }) => {

    const [menuOptions, setMenuOptions] = useState(menus)

    const handleMenuSelectedRequest = () => {
        closeAllPanels()
    }

    return (
        <div className='toolbox-option-menu-panel-container'>
            {/* <ul className='menu-panel-two-grid'>
                {
                    menuOptions.length > 0 &&

                    menuOptions?.map((shape)=>(
                        <li
                            key={shape.id}
                            title={shape.name}
                            onClick={handleMenuSelectedRequest}
                        >{shape.icon}</li>
                    ))
                }
            </ul> */}
            <div className='development-phase'>
                <strong className='h5'>More Menu Options</strong>
                <span>Still in Development Phase!!!</span>
            </div>
        </div>
    )
}

export default OtherMenuOptionsPanelContainer
