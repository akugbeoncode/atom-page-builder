import { capitalizeText } from "../helpers/utils";
import { fonts } from "./fonts";


export const uiElementOptions = {
    text : {
        active: true,
        settings: {
            "font-size": {
                default: 18,
                type: "number",
                value: 18,
                range: { min: 12, max: 72 }
            },
            "font-weight":  {
                default: 300,
                type: "select",
                value: 300,
                options: [
                    100, 200, 300, 400, 500, 600, 700, 800, 900
                ]
            },
            "color":  {
                default: "#000000",
                type: "color",
                value: "#000000"
            },
            "font-family": {
                default: fonts[0],
                type: "select",
                value: fonts[0],
                options: fonts
            },
            "x": {
                default: 0,
                type: "number",
                value: 0,
                range: { min: 0, max: 1920 }
            },
            "y": {
                default: 0,
                type: "number",
                value: 0,
                range: { min: 0, max: 800 }
            },
            "width": {
                default: 100,
                type: "number",
                value: 100,
                range: { min: 0, max: 1920 }
            },
            "height": {
                default: 50,
                type: "number",
                value: 50,
                range: { min: 0, max: 800 }
            }
        }
    },

    image: {
        active: true,
        settings: {
            "width": {
                default: 100,
                type: "number",
                value: 100,
                range: { min: 50, max: 5000 }
            },
            "height": {
                default: 100,
                type: "number",
                value: 100,
                range: { min: 50, max: 5000 }
            },
            "x": {
                default: 0,
                type: "number",
                value: 0,
                range: { min: 0, max: 1920 }
            },
            "y": {
                default: 0,
                type: "number",
                value: 0,
                range: { min: 0, max: 800 }
            },
            "border-radius":  {
                default: "0px",
                type: "select",
                value: 300,
                options: [
                    "0px", "5px", "10px", "50px", "3%", "5%", "10%", "20%", "50%", "100%"
                ]
            },
            "border":  {
                default: "none",
                type: "select",
                value: 300,
                options: [
                    "none", "1px solid #00000", "2px solid #00000", "3px solid #00000", "4px solid #00000", "4px solid #00000"
                ]
            }
        }
    },

    shape: {
        active: true,
        settings: {
            "size": {
                default: 135,
                type: "number",
                value: 135,
                range: { min: 20, max: 100 }
            },
            "color":  {
                default: "#000000",
                type: "color",
                value: "#000000"
            },
            "x": {
                default: 0,
                type: "number",
                value: 0,
                range: { min: 0, max: 1920 }
            },
            "y": {
                default: 0,
                type: "number",
                value: 0,
                range: { min: 0, max: 800 }
            },
            "width": {
                default: 150,
                type: "number",
                value: 150,
                range: { min: 50, max: 5000 }
            },
            "height": {
                default: 150,
                type: "number",
                value: 150,
                range: { min: 50, max: 5000 }
            }
        }
    }
}

export const getUiElements = () => {
    const uiElementList = [];
    const allUiElementList = Object.keys(uiElementOptions);

    allUiElementList.forEach((ui) => {
        if (uiElementOptions[ui].active) {
            uiElementList.push(capitalizeText(ui))
        }
    })

    return uiElementList
}

export const getUiElementSettingsOptions = (type) => {
    // console.log("debug", type)
    try {
        return uiElementOptions[type.toLowerCase()].settings
    } catch(err) {
        console.log(err)
        return {}
    }
}

export const getUiElementDefaultSettings = (uiElement) => {
    const settings = getUiElementSettingsOptions(uiElement);
    const defaultSetting = {}

    Object.keys(settings).forEach((setting) => {
        defaultSetting[setting] = settings[setting]["default"]
    })

    return defaultSetting
}



