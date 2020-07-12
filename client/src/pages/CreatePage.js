import React, { useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import {useHistory} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

export const CreatePage = () => {
  const history = useHistory() 
  const auth = useContext(AuthContext)
  const { loading, request, error } = useHttp()
  const [form, setForm] = useState({
    title: '',
    text: '',
  })

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const createHandler = async (event) => {
    event.preventDefault()
    const data = await request('/api/notes/add', 'POST', { ...form }, {
      Authorization: `Bearer ${auth.token}`
    })
    history.push('/')
  }

  return (
    <div className="v-align-middle">
      <h3 className="form-title">Create Note </h3>
      <form className="login-form">
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">title</i>
            <input
              id="title"
              type="text"
              className="validate"
              placeholder="Enter title..."
              name="title"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
          <i className="material-icons prefix">short_text</i>
            <textarea
              id="text"
              name="text"
              placeholder="Enter text..."
              onChange={changeHandler}
              className="validate materialize-textarea"
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col s12 right-align">
            <button
              className="waves-effect waves-light btn-large"
              onClick={createHandler}
              disabled={loading}
            >
              <i className="material-icons right">create</i>
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
