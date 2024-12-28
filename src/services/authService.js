import Client from './api'

// Sign in a user and save the token in localStorage
export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}

// Register a new user
export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

// Check the current user session
export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    console.error('Error checking session:', error)
    throw error
  }
}
