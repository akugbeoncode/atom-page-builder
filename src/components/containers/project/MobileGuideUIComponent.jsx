import React from 'react'
import noMobileIcon from '../../../assets/app_images/no-cell-phone-icon.svg'

const MobileGuideUIComponent = ({mobileGuideWidth, left, right}) => {
  return (
    <div className={`mobile-layout-guide ${left ? "left" : ""} ${right ? "right" : ""}`} style={{ position: "absolute", width: `${mobileGuideWidth}px`, height: "100vh", top: "0", left: left, right: right }}>
        <img src={noMobileIcon} alt="React Logo" />
        <span>NOT VISBLE ON MOBILE DEVICES</span>
    </div>
  )
}

export default MobileGuideUIComponent
