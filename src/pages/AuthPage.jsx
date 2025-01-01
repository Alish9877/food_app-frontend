import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInUser, registerUser } from '../services/authService'

const AuthPage = ({ setUser }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  })

  const [isLogin, setIsLogin] = useState(location.pathname === '/auth/login') // Determine initial state from the URL
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Update `isLogin` state when the URL changes
  useEffect(() => {
    setIsLogin(location.pathname === '/auth/login')
    setError(null) // Clear error when switching forms
    setSuccessMessage(null) // Clear success message when switching forms
  }, [location.pathname])

  // Redirect to login page after registration success
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        navigate('/auth/login')
      }, 2000) // 2-second delay before redirecting
      return () => clearTimeout(timer) // Cleanup timer on unmount
    }
  }, [successMessage, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && !formData.username)
    ) {
      setError('All fields are required.')
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

    setIsLoading(true)
    try {
      if (isLogin) {
        const user = await signInUser({
          email: formData.email,
          password: formData.password
        })
        setUser(user) // Set the user state
        navigate('/') // Redirect to home
      } else {
        await registerUser(formData)
        setError(null)
        setSuccessMessage('Registration successful! Redirecting to login...')
        // Clear the form after registration
        setFormData({ email: '', password: '', username: '' })
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
    // Toggle between login and register
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
