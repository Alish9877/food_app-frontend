import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInUser, registerUser } from '../services/authService'

const AuthPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })
  const navigate = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(location.pathname === '/auth/login') // Determine initial state from URL
  const [error, setError] = useState(null)

  useEffect(() => {
    // Sync state with URL
    setIsLogin(location.pathname === '/auth/login')
  }, [location.pathname])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const user = await signInUser({
          email: formData.email,
          password: formData.password
        })
        setUser(user) // Update user state
        navigate('/') // Redirect to home after login
      } else {
        await registerUser(formData)
        setError(null)
        alert('Registration successful! Please log in.')
        navigate('/auth/login') // Redirect to login after registration
      }
      setFormData({ email: '', password: '', username: '' }) // Clear form
    } catch (err) {
      setError(
        isLogin
          ? 'Login failed. Please try again.'
          : 'Registration failed. Please try again.'
      )
    }
  }

  const toggleForm = () => {
    navigate(isLogin ? '/auth/register' : '/auth/login') // Update URL
  }

  return (
    <div className="auth-page">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {error && <p className="error">{error}</p>}
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
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={toggleForm}>
        {isLogin
          ? 'Need an account? Register'
          : 'Already have an account? Login'}
      </button>
    </div>
  )
}

export default AuthPage
