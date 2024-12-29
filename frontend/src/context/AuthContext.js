import { useState, createContext } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { loginService, signUpService } from "../service/AuthService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const localStorageToken =
    JSON.parse(localStorage.getItem('loginDetails')) || {}
  const [currentUser, setCurrentUser] =
    useState(localStorageToken?.user) || null
  const [token, setToken] = useState(localStorageToken?.token) || null
  const navigate = useNavigate()
  const location = useLocation()

  const loginHandler = async ({ email, password }) => {
    try {
      const response = await loginService(email, password)
      const { status, data } = response
      const { user, token } = data

      if (status === 200) {
        localStorage.setItem(
          'loginDetails',
          JSON.stringify({ user: user, token: token })
        )
        setCurrentUser(user)
        setToken(token)
        toast.success('Successfully log in!')
        navigate(location.state?.from?.pathname || '/')
      }
    } catch (err) {
      const {
        response: { status }
      } = err
      if (status === 401) {
        toast.error('Invalid password! Please try again!')
      } else if (status === 404) {
        toast.error('Credentials not found! Please signup before logging in!')
      } else {
        console.error(err)
        toast.error('Unable to sign in!')
      }
    }
  }

  const signUpHandler = async ({ name, email, password }) => {
    try {
      const response = await signUpService(name, email, password)

      const { status, data } = response
      const { token } = data

      if (status === 201) {
        localStorage.setItem(
          'loginDetails',
          JSON.stringify({
            token: token
          })
        )
        setToken(token)
        toast.success('Successfully signed up! Kindly login to continue!')
        navigate('/login')
      }
    } catch (err) {
      const {
        response: { status }
      } = err
      if (status === 422) {
        toast.error(
          'User email already exists! Please try signing up with another email!'
        )
      } else {
        console.error(err)
        toast.error('Unable to sign up!')
      }
    }
  }

  const logoutHandler = () => {
    setToken(null)
    setCurrentUser(null)
    localStorage.removeItem('loginDetails')
    toast.success('Logged out successfully!')
    navigate(location?.state?.from?.pathname ?? '/')
  }

  return <AuthContext.Provider value={{loginHandler,signUpHandler,currentUser,token,logoutHandler}}>{children}</AuthContext.Provider>
}
