import {useState, useCallback, useEffect} from 'react'
import {useHttp} from './http.hook'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const { request } = useHttp()

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken,
      userId: id 
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)
  }, [])

  const checkAuth = useCallback(async ({token, userId}) => {
    try {
      await request('/api/auth/check-auth', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      console.log('Done')
      login(token, userId)
    } catch(e) {
      if (e && e.authStatus === false) {
        logout()
      }
    } finally {
      setLoaded(true)
    }
  }, [token, request])
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data) {
      checkAuth(data)
    } else {
      setLoaded(true)
    }
  }, [login, checkAuth])

  return { login, logout, token, userId, loaded }
}