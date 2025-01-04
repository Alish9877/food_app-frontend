import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInUser, registerUser } from '../services/authService'

const AuthPage = ({ setUser }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLogin, setIsLogin] = useState(location.pathname === '/auth/login')
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLogin(location.pathname === '/auth/login')
    setError(null)
    setSuccessMessage(null)
  }, [location.pathname])

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('/auth/login')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      setError('Email and password are required.')
      return
    }
    if (!isLogin && !formData.username) {
      setError('Username is required for registration.')
      return
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (!isLogin) {
      if (!formData.confirmPassword) {
        setError('Please confirm your password.')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.')
        return
      }
    }

    setIsLoading(true)
    try {
      if (isLogin) {
        const user = await signInUser({
          email: formData.email,
          password: formData.password
        })
        setUser(user)
        navigate('/')
      } else {
        const { username, email, password } = formData
        await registerUser({ username, email, password })
        setError(null)
        setSuccessMessage('Registration successful! Redirecting to login...')
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      }
    } catch (err) {
      setError(
        isLogin
          ? 'Login failed. Please try again.'
          : 'Registration failed. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const toggleForm = () => {
    navigate(isLogin ? '/auth/register' : '/auth/login')
  }

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>

      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button onClick={toggleForm} disabled={isLoading}>
        {isLogin
          ? 'Need an account? Register'
          : 'Already have an account? Login'}
      </button>
    </div>
  )
}

export default AuthPage
