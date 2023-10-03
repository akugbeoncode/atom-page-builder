const hostname = process.env.REACT_APP_ENV === "development" ? "localhost:5000" : "json-server-rbhf.onrender.com";
const protocolType = process.env.REACT_APP_ENV === "development" ? "http" : "https";

export const fetchUsers = async () => {
    const response = await fetch(`${protocolType}://${hostname}/users`);
    const data = await response.json();
    return data;
}

export const fetchUser = async (id) => {
    const res = await fetch(`${protocolType}://${hostname}/users/${id}`)
    const data = await res.json()
    return data
}

export const fetchUserByProps = async (property, value) => {
    const usersFromServer = await fetchUsers()
    let user = null

    usersFromServer.forEach(u => {
        if (u[property] === value) {
            user = u
        }
    })

    return user
}

export const createUser = async (user) => {
    const res = await fetch(`${protocolType}://${hostname}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
}

export const createIfUserDoesNot = async (user) => {
    let usersFromServer = await fetchUsers()
    let userExist = false;
    let data = null
    
    usersFromServer.forEach(function (u) {
        if (u.email === user.email) {
            userExist = true
        }
    })

    if (!userExist) {
        data = await createUser(user)
    } 

    const response = {
        status: userExist ? "failed" : "successful",
        code: userExist ? 400 : 200,
        message: userExist ? "failed to create user account as user already exist" : "user account created successfully",
        data: data
    }

    return response;
    
}