import { createContext, useContext, useState, useEffect } from "react"
import jwtDecode from 'jwt-decode';
import { SHA256 } from "crypto-js";
import Header from "../structure/Header";
import RenderRoutes from "../structure/RenderRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { createIfUserDoesNot, fetchUserByProps } from "../../apis/users";
import Alert from "../common/Alert";
import { emptyObject } from "../../helpers/utils";
import { loginHelper } from "../../helpers/loginHelper";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

const AuthWrapper = () => {
    const standardMobileWidth = 767;
    const userInfoExist = localStorage.getItem('user') ? true : false;
    const [user, setUser] = useState(localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null);
    const [isAuthenticated, setIsAuthenticated] = useState(userInfoExist);
    const [showPageHeader, setShowPageHeader] = useState(true);
    const [isModalActive, setIsModalActive] = useState(false);
    const [showAlertMessage, setShowAlertMessage] = useState({active: false, code: null, status: null, message: null});
    const [projectRef, setProjectRef] = useState("")
    const [windowDimensions, setWindowDimensions] = useState({ winWidth: window.innerWidth, winHeight: window.innerHeight })
    const [mobileGuideWidth, setMobileGuideWidth] = useState(100);
    const [isMobileScreenView, setIsMobileScreenView] = useState(windowDimensions.winWidth < 992 ? true : false)
    const location = useLocation();
    const navigate = useNavigate();
    const loggedUserExcludedRoutes = ["/login", "/register"];
    

    const detectSize = () => {
        setWindowDimensions({ winWidth: window.innerWidth, winHeight: window.innerHeight })
        setIsMobileScreenView(windowDimensions.winWidth < 992 ? true : false)
        calculateMobileGuideWidth()
    }

    const calculateMobileGuideWidth = () => {
        setMobileGuideWidth(parseInt((windowDimensions.winWidth - standardMobileWidth)/2))
    }

    const switchToMobileScreenView = () => {
        setWindowDimensions({ winWidth: standardMobileWidth, winHeight: window.innerHeight });
        setIsMobileScreenView(true);
    }


    const switchToWebeScreenView = () => {
        setWindowDimensions({ winWidth: window.innerWidth, winHeight: window.innerHeight });
        setIsMobileScreenView(false);
    }

    const toggleScreenViewBetweenMobileAndWebView = (requestScreenType) => {
        if (window.innerWidth > standardMobileWidth) {
            if (requestScreenType === "web") {
                switchToWebeScreenView()
            }

            if (requestScreenType === "mobile") {
                switchToMobileScreenView()
            }
        }
        return null
    }

    const registerUser = async (userData, type=null) => {
        const response = await createIfUserDoesNot(userData);
        return response;
    }

    const responseFromGoogleHandled = async (response) => {
        const decodedData = jwtDecode(response.credential)
        const { name, picture, sub, email } = decodedData;
		const userData = {
			name: name.toLowerCase(),
			email: email.toLowerCase(),
			imageUrl: picture,
			reference: sub,
			password: SHA256(sub).toString(),
			accountType: "Google OAuth",
			createdAt: Date.now()
		}

        const data = await registerUser(userData)
        await authenticateUser(userData)
        return data;
    }

    const login = async (email, password) => {
        const response = await loginHelper(email, password);
        if (response.code === 200) {
            localStorage.setItem("user", JSON.stringify(response.data))
            setIsAuthenticated(true)
        }
        return response;
    }
    

    const logout = () => {
        localStorage.clear();
        setUser(null)
        setIsAuthenticated(false)
        setTimeout(()=>{
            navigate('/login', {replace: true});
        }, 1000)
    }

    const authenticateUser = async (userInfo) => { 
        const prop = "email" 
        const authUser = await fetchUserByProps(prop, userInfo[prop]);
        delete authUser.password
        if (emptyObject(authUser)) {
            logout()
        } else {
            localStorage.setItem("user", JSON.stringify(authUser))
            setIsAuthenticated(true)
        }
    }

    useEffect(()=>{
        if (showAlertMessage.active) {
            setTimeout(()=>{
                setShowAlertMessage({active: false, code: null, status: null, message: null});
            }, 5000)
        }
    }, [showAlertMessage]);

    useEffect(()=>{
        setUser(localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null);
    }, [isAuthenticated]);

    useEffect(() => {
        if (user && loggedUserExcludedRoutes.includes(location.pathname)) {
            navigate('/dashboard', {replace: true});
        }
    }, [location]);

    useEffect(()=>{
        if (projectRef) {
            setShowPageHeader(false)
        } else {
            setShowPageHeader(true)
        }
    }, [projectRef])

    useEffect(()=>{
        window.addEventListener("resize", detectSize)
        calculateMobileGuideWidth()

        return () => {
            window.removeEventListener("resize", detectSize)
        }
    }, [windowDimensions])

    useEffect(()=>{
        console.log("mobile screen view ==>>>  ", isMobileScreenView)
    }, [isMobileScreenView])

    return (
        <AuthContext.Provider value={{ 
            user, isAuthenticated, registerUser, login, responseFromGoogleHandled, logout, showPageHeader, setShowPageHeader, setShowAlertMessage, authenticateUser, projectRef, setProjectRef, isModalActive, setIsModalActive, isMobileScreenView, windowDimensions, mobileGuideWidth, toggleScreenViewBetweenMobileAndWebView
        }}>
            <>
                { showPageHeader && <Header />}
                {/* { showAlertMessage.active && <Alert code={showAlertMessage.code} status={showAlertMessage.status} message={showAlertMessage.message} />} */}
                <RenderRoutes />
                <div style={{ position: "fixed", bottom: '10px', left: "10px" }}>{windowDimensions.winWidth} x {windowDimensions.winHeight}</div>
            </>
        </AuthContext.Provider>
    )
}

export default AuthWrapper
