import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export const Navbar = () => {
  const { logout } = useContext(AuthContext)
  const history = useHistory()
  const logoutHandler = e => {
    e.preventDefault()
    logout()
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          Notes App
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/">Notes</NavLink>
          </li>
          <li>
            <NavLink to="/create">Add Note</NavLink>
          </li> 
          <li>
            <a href="/" onClick={logoutHandler}>
              <i className="material-icons prefix">exit_to_app</i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
