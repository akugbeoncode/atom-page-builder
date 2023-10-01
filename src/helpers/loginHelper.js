import { SHA256 } from "crypto-js";
import { fetchUserByProps } from "../apis/users"

export const loginHelper = async (email, password) => {
    let loginStatus = false;
    const prop = "email";
    const userFromServer = await fetchUserByProps(prop, email);
    
    if (userFromServer) {
        const passwordHash = SHA256(password).toString();
        if (passwordHash === userFromServer.password) {
            loginStatus = true;
        }
        delete userFromServer.password;
    }

    const response = {
        status: loginStatus ? "success" : "failed",
        code: loginStatus ?  200 : 400,
        message: loginStatus ? "user account created successfully" : "Invalid email or password!",
        data: userFromServer
    }

    return response;
}