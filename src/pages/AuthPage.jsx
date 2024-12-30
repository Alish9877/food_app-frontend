import React, { useState } from 'react'
import { signInUser } from '../services/authService'

const AuthPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await signInUser(formData) // API call
      setUser(user) // Update user state
      setFormData({ email: '', password: '' }) // Clear form
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="auth-page">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default AuthPage
