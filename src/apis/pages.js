import { v4 as uuidv4 } from 'uuid';
import { fetchActivePageElements } from './pageElements';
const hostname = process.env.REACT_APP_ENV === "development" ? "localhost:5000" : "json-server-rbhf.onrender.com";
const protocolType = process.env.REACT_APP_ENV === "development" ? "http" : "https";

export const fetchPages = async () => {
    const response = await fetch(`${protocolType}://${hostname}/pages`);
    const data = await response.json();
    return data;
}

export const fetchPage = async (id) => {
    const res = await fetch(`${protocolType}://${hostname}/pages/${id}`)
    const data = await res.json()
    return data
}

export const fetchPageByProps = async (property, value) => {
    const containersFromServer = await fetchPages()
    let container = null

    containersFromServer.forEach(cont => {
        if (cont[property] === value) {
            container = cont
        }
    })

    return container
}

export const createPage = async (page) => {
    const res = await fetch(`${protocolType}://${hostname}/pages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(page)
    })
    const data = await res.json()
    return data
}

export const fetchProjectPages = async (projectRef) => {
    const pagesFromServer = await fetchPages()
    let pages = []

    pagesFromServer.forEach(page => {
        if (page["project"] === projectRef) {
            pages.push(page)
        }
    })

    if (pages.length <= 0) {
        const pageObj = {
            project: projectRef,
            reference: uuidv4(),
            name: "main",
            settings: {
                theme: {
                    type: "Solid Color",
                    name: "White Background",
                    settings: { "background": "#FFFFFF"}
                },
                usePattern: false,
                color: "#FFFFFF"
            }
        }

        const page = await createPage(pageObj)
        pages.push(page)
    }

    return pages
}

export const fetchProjectPagesWithNoCreate = async (projectRef) => {
    const pagesFromServer = await fetchPages()
    let pages = []

    pagesFromServer.forEach(page => {
        if (page["project"] === projectRef) {
            pages.push(page)
        }
    })

    return pages
}

export const deletePageAndAllUiElements = async (id, reference) => {
    const pageElements = await fetchActivePageElements(reference)

    pageElements.forEach(async (elem) => {
        await fetch(`${protocolType}://${hostname}/pageElements/${elem.id}`, {
            method: "DELETE"
        })
    })

    await fetch(`${protocolType}://${hostname}/pages/${id}`, {
        method: "DELETE"
    })
}