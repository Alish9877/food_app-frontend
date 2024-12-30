import Client from './api'

// Sign in user and save token
export const signInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    const { token, user } = res.data
    saveToken(token)
    return user
  } catch (error) {
    console.error('Error signing in:', error)
    throw error.response?.data || 'Error signing in'
  }
}

// Register a new user
export const registerUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error.response?.data || 'Error registering user'
  }
}

// Validate session
export const checkSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    console.error('Error checking session:', error)
    throw error.response?.data || 'Error checking session'
  }
}

// Token management
export const saveToken = (token) => {
  if (token) localStorage.setItem('token', token)
}

export const getToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')
