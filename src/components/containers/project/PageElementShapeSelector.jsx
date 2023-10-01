import * as BsIcons from "react-icons/bs";

const PageElementShapeSelector = ({ element }) => { 
  
    if (element.shapeId === 1) {
        return (<BsIcons.BsSquareFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 2) {
        return (<BsIcons.BsFillDiamondFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 3) {
        return (<BsIcons.BsFillCircleFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 4) {
        return (<BsIcons.BsFillCompassFill fontSize={element.settings.size} color={element.settings.color} />)
    }

    if (element.shapeId === 5) {
        return (<BsIcons.BsFillFileEarmarkFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 6) {
        return (<BsIcons.BsFillGeoAltFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 7) {
        return (<BsIcons.BsFillHeartFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 8) {
        return (<BsIcons.BsFillOctagonFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 9) {
        return (<BsIcons.BsFillShieldFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 10) {
        return (<BsIcons.BsBoxFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 11) {
        return (<BsIcons.BsChatFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 12) {
        return (<BsIcons.BsCheckLg fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 13) {
        return (<BsIcons.BsCursorFill fontSize={element.settings.size} color={element.settings.color} />)
    }
    
    if (element.shapeId === 14) {
        return (<BsIcons.BsCloudyFill fontSize={element.settings.size} color={element.settings.color} />)
    }
}

export default PageElementShapeSelector
