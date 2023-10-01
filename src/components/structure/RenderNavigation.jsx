/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { BiUserCircle, BiLogOut } from "react-icons/bi";
import { AuthData } from '../auth/AuthWrapper'
import { nav } from './nav'
import { Link, NavLink } from 'react-router-dom'
import TextualRepImage from '../common/TextualRepImage';
import ImageUrl from '../common/ImageUrl';

const RenderNavigation = ({ collapseMobileMenu, loadingMobileMenuState, setCollapseMobileMenu }) => {
    const { isAuthenticated, logout, user } = AuthData()
    const [showUserMenuDropdown, setShowUserMenuDropdown] = useState(false)
    const activeClassName = "nav-link active"
    const nonActiveClassName = "nav-link"
   
    const MenuItem = ({r}) => {
         return (
              <li className="nav-item"><NavLink onClick={()=>setCollapseMobileMenu(!collapseMobileMenu)}  className={({ isActive }) => isActive ? activeClassName : nonActiveClassName} to={r.path}>{r.name}</NavLink></li>
         )
    }

    const handleLogoutRequest = (e) => {
        e.stopPropagation();
        setShowUserMenuDropdown(!showUserMenuDropdown)
        logout()
    }

    return (
        <div className={`collapse navbar-collapse ${ collapseMobileMenu ? "show" : ""}`} id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
                { nav.map((r, i) => {
    
                    if (!r.isPrivate && r.isMenu) {
                            return (
                                <MenuItem key={i} r={r}/>
                            )
                    } else if (isAuthenticated && r.isMenu) {
                            return (
                                <MenuItem key={i} r={r}/>
                            )
                    } else return false
                })}
            </ul>

            { isAuthenticated &&
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><NavLink onClick={()=>setCollapseMobileMenu(!collapseMobileMenu)} className={({ isActive }) => isActive ? activeClassName : nonActiveClassName} to="/my-projects">My Projects</NavLink></li>
                    <li className="nav-item dropdown">
                        <a className={`nav-link dropdown-toggle ${showUserMenuDropdown ? "show" : ""}`} onClick={(e)=>{
                            e.stopPropagation()
                            setShowUserMenuDropdown(!showUserMenuDropdown)
                        }} role="button" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            { user?.imageUrl &&
                                <ImageUrl />
                            }

                            { !user?.imageUrl &&
                                <TextualRepImage />
                            }
                        </a>
                        <ul className={`dropdown-menu ${showUserMenuDropdown ? "show" : ""}`}>
                            <li className="dropdown-item"><NavLink onClick={()=>{
                                setShowUserMenuDropdown(!showUserMenuDropdown)
                                setCollapseMobileMenu(!collapseMobileMenu)
                            }} className={({ isActive }) => isActive ? activeClassName : nonActiveClassName} to="/user-profile"><BiUserCircle /> &nbsp;&nbsp; Profile</NavLink></li>
                            <li className="dropdown-item">
                                <Link className="nav-link" onClick={(e) => { 
                                    setCollapseMobileMenu(!collapseMobileMenu)
                                    handleLogoutRequest(e) 
                                    }}><BiLogOut /> &nbsp;&nbsp; Logout</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            }

            { !isAuthenticated &&
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><NavLink onClick={()=>setCollapseMobileMenu(!collapseMobileMenu)} className={({ isActive }) => isActive ? activeClassName : nonActiveClassName} to="/login">Sign In</NavLink></li>
                    <li className="nav-item"><NavLink onClick={()=>setCollapseMobileMenu(!collapseMobileMenu)} className={({ isActive }) => isActive ? activeClassName : nonActiveClassName} to="/Register">Sign Up</NavLink></li>
                </ul>
            }

        </div>
    )
}

export default RenderNavigation
