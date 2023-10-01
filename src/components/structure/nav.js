import Dashboard from "../containers/pages/Dashboard";
import Projects from "../containers/pages/Projects";
import Project from "../containers/pages/Project";
import UserProfile from "../containers/pages/UserProfile";
import Register from "../containers/pages/Register";
import Login from "../containers/pages/Login";
import PublishedProjects from "../containers/pages/PublishedProjects";
import CreateProject from "../containers/pages/CreateProject";


export const nav = [
    { path:     "/",         name: "Projects",        element: <PublishedProjects />,       isMenu: true,     isPrivate: false  },
    { path:     "/dashboard",         name: "Dashboard",        element: <Dashboard />,       isMenu: true,     isPrivate: true  },
    { path:     "/create-project",         name: "CreateProject",        element: <CreateProject />,       isMenu: false,     isPrivate: true  },
    { path:     "/my-projects",         name: "Projects",        element: <Projects />,       isMenu: false,     isPrivate: true  },
    { path:     "/user-profile",         name: "UserProfile",        element: <UserProfile />,       isMenu: false,     isPrivate: true  },
    { path:     "/login",         name: "Login",        element: <Login />,       isMenu: false,     isPrivate: false  },
    { path:     "/register",         name: "Register",        element: <Register />,       isMenu: false,     isPrivate: false  },
    { path:     "/:projectRef",         name: "Project",        element: <Project />,       isMenu: false,     isPrivate: false  },
]

export const authenticatedUserSpecificRuotes = [
    { path:     "/dashboard",         name: "Dashboard",        element: <Dashboard />,       isMenu: true,     isPrivate: true  },
    { path:     "/my-projects",         name: "Projects",        element: <Projects />,       isMenu: false,     isPrivate: true  }
]

export const unAuthenticatedUserSpecificRuotes = [
    { path:     "/",         name: "Projects",        element: <PublishedProjects />,       isMenu: true,     isPrivate: false }
]