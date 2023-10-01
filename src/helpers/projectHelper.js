import { fetchProjectPagesWithNoCreate } from "../apis/pages"

export const getPageNameValidity = async (pageName, projectRef) => {
    const pages = await fetchProjectPagesWithNoCreate(projectRef)
    let validName = true;

    pages.forEach(page=>{
        if (page["name"] === pageName) {
            validName = false
        }
    })

    return validName
}