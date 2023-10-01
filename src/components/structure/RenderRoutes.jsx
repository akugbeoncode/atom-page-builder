import React from 'react'
import { nav } from './nav'
import { Route, Routes } from 'react-router-dom'
import { AuthData } from '../auth/AuthWrapper';

const RenderRoutes = () => {

    const { isAuthenticated } = AuthData();

    return (
        <Routes>
            { nav.map((r, i) => {
                  
                  if (r.isPrivate && isAuthenticated) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else if (!r.isPrivate) {
                       return <Route key={i} path={r.path} element={r.element}/>
                  } else return false
             })}
        </Routes>
    )
}

export default RenderRoutes
