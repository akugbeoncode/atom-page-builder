import { emptyObject } from "../helpers/utils";
const hostname = process.env.REACT_APP_ENV === "development" ? "localhost:5000" : "json-server-rbhf.onrender.com";
const protocolType = process.env.REACT_APP_ENV === "development" ? "http" : "https";

export const fetchPageElements = async () => {
    const res = await fetch(`${protocolType}://${hostname}/pageElements`)
    const data = await res.json()
    return data
}

export const fetchPageElement = async (id) => {
    const res = await fetch(`${protocolType}://${hostname}/pageElements/${id}`)
    const data = await res.json()
    return data
}

export const createPageElement = async (pageElement) => {
    const res = await fetch(`${protocolType}://${hostname}/pageElements`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pageElement)
    })
    const data = await res.json()
    return data
}

export const fetchPageElementByProps = async (property, value) => {
    const pageElementsFromServer = await fetchPageElements()
    let pageElement = null

    pageElementsFromServer?.forEach(pe => {
        if (pe[property] === value) {
            pageElement = pe
        }
    })

    return pageElement
}

export const fetchActivePageElements = async (pageRef) => {
    const pageElementsFromServer = await fetchPageElements()
    let pageElements = []

    pageElementsFromServer?.forEach(function (pe)  {
        if (pe["page"] === pageRef) {
            pageElements.push(pe)
        }
    })

    return pageElements
}