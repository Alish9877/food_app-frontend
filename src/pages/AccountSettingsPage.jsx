import { useState } from 'react'
import { updateUserProfile, updateUserPassword } from '../services/authService'

const AccountSettingsPage = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    oldPassword: '',
    newPassword: ''
  })
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const updateUsername = async () => {
    if (!formData.username.trim()) {
      setError('Username cannot be empty.')
      setMessage(null)
      return
    }
    setIsLoading(true)
    try {
      const updatedUser = await updateUserProfile(user.id, {
        username: formData.username.trim()
      })
      setUser({ ...user, username: updatedUser.username })
      setMessage('Username updated successfully!')
      setError(null)
    } catch (error) {
      setError('Failed to update username. Please try again.')
      setMessage(null)
      console.error('Update username error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updatePassword = async () => {
    if (!formData.oldPassword || !formData.newPassword) {
      setError('Both old and new passwords are required.')
      setMessage(null)
      return
    }
    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters.')
      setMessage(null)
      return
    }
    setIsLoading(true)
    try {
      await updateUserPassword(user.id, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      })
      setMessage('Password updated successfully!')
      setError(null)
      setFormData({ ...formData, oldPassword: '', newPassword: '' })
    } catch (error) {
      setError('Failed to update password. Please try again.')
      setMessage(null)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return <p>Loading user data...</p>
  }

  return (
    <div className="account-settings-page">
      <h1>Account Settings</h1>
      <p>Manage your account details and preferences here.</p>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <div className="update-section">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Update your username"
        />
        <button type="button" onClick={updateUsername} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Username'}
        </button>
      </div>

      <div className="update-section">
        <label>Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          placeholder="Enter your old password"
        />
        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter your new password"
        />
        <button type="button" onClick={updatePassword} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  )
}

export default AccountSettingsPage
