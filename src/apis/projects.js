const hostname = window.location.hostname;

export const fetchProjects = async () => {
    const response = await fetch(`http://${hostname}:5000/projects`);
    const data = await response.json();
    return data;
}

export const fetchProject = async (id) => {
    const res = await fetch(`http://${hostname}:5000/projects/${id}`)
    const data = await res.json()
    return data
}

export const fetchProjectByProps = async (property, value) => {
    const projectsFromServer = await fetchProjects()
    let project = null

    projectsFromServer.forEach(proj => {
        if (proj[property] === value) {
            project = proj
        }
    })

    return project
}

export const createProject = async (project) => {
    const res = await fetch(`http://${hostname}:5000/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    })
    const data = await res.json()
    return data
}

export const createIfProjectDoesNot = async (project) => {
    const projectsFromServer = await fetchProjects()
    let projectExist = false;
    let data = null;
    
    projectsFromServer.forEach(function (proj) {
        if (proj.slug === project.slug) {
            projectExist = true
        }
    })

    if (!projectExist) {
        data = await createProject(project)
    } 

    const response = {
        status: projectExist ? "failed" : "successful",
        code: projectExist ? 400 : 200,
        message: projectExist ? "failed to create project as project title already exist" : "project created successfully",
        data: data
    }

    return response;
}

export const fetchLoggedUserProjects = async (owner) => {
    const projectsFromServer = await fetchProjects()
    const loggedUserProjects = [];

    projectsFromServer.forEach(function (proj) {
        if (proj.owner === owner) {
            loggedUserProjects.push(proj)
        }
    })

    return loggedUserProjects;
}

export const fetchPublishedProjects = async () => {
    const projectsFromServer = await fetchProjects()
    const publishedProjects = [];

    projectsFromServer.forEach(function (proj) {
        if (proj.publish) {
            publishedProjects.push(proj)
        }
    })

    return publishedProjects;
}