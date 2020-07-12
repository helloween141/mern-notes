import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import AuthContext from '../context/AuthContext'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const showMessage = useMessage()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const { loading, error, request, clearError } = useHttp()
  
  useEffect(() => {
    showMessage(error)
    clearError()
  }, [error, showMessage, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      showMessage(data.message)
      
    } catch(e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch(e) {}
  }

  return (
    <div className="v-align-middle">
      <h3 className="form-title">Notes App</h3>
      <form className="login-form">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">account_circle</i>
            <input 
              id="email" 
              type="email" 
              className="validate" 
              placeholder="Email" 
              name="email"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input 
              id="password" 
              type="password" 
              className="validate" 
              placeholder="Password"
              name="password"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col s12 m6 l6 xl6 left-align form-btn">
            <a className="waves-effect waves-light btn-large" onClick={registerHandler}>
              Register Me
            </a>
          </div>
          <div className="col s12 m6 l6 xl6 right-align form-btn">
            <button className="waves-effect waves-light btn-large" onClick={loginHandler} disabled={loading}>
            <i className="material-icons right">login</i>
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
