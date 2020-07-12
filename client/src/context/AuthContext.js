import React from 'react'

function noop() {}
const AuthContext = React.createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuth: false
}) 

export default AuthContext