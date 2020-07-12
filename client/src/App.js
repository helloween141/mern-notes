import React, { useEffect, useState, useCallback } from 'react'
import 'materialize-css'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import AuthContext from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { Loader } from './components/Loader'
import { useHttp } from './hooks/http.hook'

function App() {
  const { login, logout, token, userId, loaded } = useAuth() 
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  if (!loaded) {
    return <Loader />
  } else {
    return (
      <AuthContext.Provider value={{ login, logout, token, userId, isAuth }}>
        <Router>
          { isAuth && <Navbar /> }
           <div className="container">
             {routes}
           </div>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App
