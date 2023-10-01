import { capitalizeText } from "../helpers/utils";

export const patterns = [
    {
        id: 1,
        name: "Carbon",
        className: "themes-carbon",
        parameters: {
            "background": `linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px, linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px, linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px, linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px, linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424)`,
            "background-color": "#131313",
            "background-size": "20px 20px"
        }
    },{
        id: 2,
        name: "Upholstery",
        className: "themes-upholstery",
        parameters: {
            "background": `radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 9%, hsla(0, 100%, 20%, 0) 9%) 0 0, radial-gradient(hsl(0, 100%, 27%) 4%, hsl(0, 100%, 18%) 8%, hsla(0, 100%, 20%, 0) 10%) 50px 50px, radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 50px 0, radial-gradient(hsla(0, 100%, 30%, 0.8) 20%, hsla(0, 100%, 20%, 0)) 0 50px, radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 50px 0, radial-gradient(hsla(0, 100%, 20%, 1) 35%, hsla(0, 100%, 20%, 0) 60%) 100px 50px, radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 0 0, radial-gradient(hsla(0, 100%, 15%, 0.7), hsla(0, 100%, 20%, 0)) 50px 50px, linear-gradient(45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0, linear-gradient(-45deg, hsla(0, 100%, 20%, 0) 49%, hsla(0, 100%, 0%, 1) 50%, hsla(0, 100%, 20%, 0) 70%) 0 0`,
            "background-color": "#300",
            "background-size": "100px 100px"
        }
    },{
        id: 3,
        name: "Starry Night",
        className: "themes-starry-night",
        parameters: {
            "background-color": "black",
            "background-image": `radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px), radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px)`,
            "background-size": "550px 550px, 350px 350px, 250px 250px, 150px 150px",
            "background-position": "0 0, 40px 60px, 130px 270px, 70px 100px"
        }
    },{
        id: 4,
        name: "Cross Dots",
        className: "themes-cross-dots",
        parameters: {
            "background": "radial-gradient(black 3px, transparent 4px), radial-gradient(black 3px, transparent 4px), linear-gradient(#fff 4px, transparent 0), linear-gradient(45deg, transparent 74px, transparent 75px, #a4a4a4 75px, #a4a4a4 76px, transparent 77px, transparent 109px), linear-gradient(-45deg, transparent 75px, transparent 76px, #a4a4a4 76px, #a4a4a4 77px, transparent 78px, transparent 109px), #fff",
            "background-size": "109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px",
            "background-position": "54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px"
        }
    },{
        id: 5,
        name: "Rainbow Bokeh",
        className: "themes-rainbow-bokeh",
        parameters: {
            "background": "radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.15) 30%, rgba(255,255,255,.3) 32%, rgba(255,255,255,0) 33%) 0 0, radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.3) 13%, rgba(255,255,255,0) 14%) 0 0, radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 17%, rgba(255,255,255,.43) 19%, rgba(255,255,255,0) 20%) 0 110px, radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) -130px -170px, radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.2) 11%, rgba(255,255,255,.4) 13%, rgba(255,255,255,0) 14%) 130px 370px, radial-gradient(rgba(255,255,255,0) 0, rgba(255,255,255,.1) 11%, rgba(255,255,255,.2) 13%, rgba(255,255,255,0) 14%) 0 0, linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%, #006782 40%, #0b1284 50%, #760ea1 60%, #83096e 70%, #840b2a 80%, #b13e12 90%, #e27412 100%)",
            "background-size": "470px 470px, 970px 970px, 410px 410px, 610px 610px, 530px 530px, 730px 730px, 100% 100%",
            "background-color": "#840b2a"
        }
    },{
        id: 6,
        name: "Weave",
        className: "themes-weave",
        parameters: {
            "background": "linear-gradient(135deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px), linear-gradient(225deg, #708090 21px, #d9ecff 22px, #d9ecff 24px, transparent 24px, transparent 67px, #d9ecff 67px, #d9ecff 69px, transparent 69px)0 64px",
            "background-color": "#708090",
            "background-size": "64px 128px"
        }
    },{
        id: 7,
        name: "Bricks",
        className: "themes-bricks",
        parameters: {
            "background-color": "silver",
            "background-image": "linear-gradient(335deg, #b00 23px, transparent 23px), linear-gradient(155deg, #d00 23px, transparent 23px), linear-gradient(335deg, #b00 23px, transparent 23px), linear-gradient(155deg, #d00 23px, transparent 23px)",
            "background-size": "58px 58px",
            "background-position": "0px 2px, 4px 35px, 29px 31px, 34px 6px"
        }
    },{
        id: 8,
        name: "Blue Sky",
        className: "themes-blue-sky",
        parameters: {
            "background": "#c6edff",
            "background": "-moz-linear-gradient(to right,  #c6edff 0%,#a3c6ff 100%)",
            "background": "-webkit-linear-gradient(to right,  #c6edff 0%,#a3c6ff 100%)",
            "background": "linear-gradient(to right,  #c6edff 0%,#a3c6ff 100%)"
        }
    },{
        id: 9,
        name: "Sunset Nude",
        className: "themes-sunset-nude",
        parameters: {
            "background": "#f7d9b5", 
            "background": "-moz-linear-gradient(-22deg,  #f7d9b5 0%,#a98e83 100%)",
            "background": "-webkit-linear-gradient(-22deg,  #f7d9b5 0%,#a98e83 100%)",
            "background": "linear-gradient(-22deg,  #f7d9b5 0%,#a98e83 100%)"
        }
    },{
        id: 10,
        name: "Warm Lemon",
        className: "themes-warm-lemon",
        parameters: {
            "background": "#bfffcd",
            "background": "-moz-linear-gradient(to right,  #bfffcd 0%,#93efdd 100%)",
            "background": "-webkit-linear-gradient(to right,  #bfffcd 0%,#93efdd 100%)",
            "background": "linear-gradient(to right,  #bfffcd 0%,#93efdd 100%)"
        }
    }
]

export const getThemePatternByName = (themeName) => {
    let targetTheme = null;

    patterns.forEach((pattern)=>{
        if (pattern.name === themeName) {
            targetTheme = pattern;
        }
    })

    if (!targetTheme) {
        targetTheme = patterns[0]
    }

    return targetTheme
}

export const processThemePattern = (patternObject, type="Pattern") => {
    return {
        type: type,
        name: patternObject.name,
        settings: generateThemeSettings(patternObject.parameters)
    }
}

function generateThemeSettings(parametersObj) {
    const cssSelectors = Object.keys(parametersObj);
    const settings = {};

    cssSelectors.forEach((selector) => {
        settings[createCarmelCaseString(selector)] = parametersObj[selector];
    })
    
    return settings;
}

function createCarmelCaseString(selector) {
    const wordList = selector.split("-");

    if (wordList.length === 1) {
        return selector.toLowerCase()
    } else {
        let carmelCaseString = "";

        wordList.map((word, index) => {
            if (index === 0) {
                carmelCaseString = word.toLowerCase()
            } else {
                carmelCaseString += capitalizeText(word.toLowerCase())
            }
        })
        return carmelCaseString;
    }
}