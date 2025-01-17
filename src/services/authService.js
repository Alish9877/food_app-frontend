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
    const token = getToken()
    if (!token) {
      console.warn('No token found. Skipping session validation.')
      return null
    }
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    console.error('Invalid session:', error)
    removeToken()
    throw error
  }
}

// Delete user account
export const deleteUserAccount = async (userId) => {
  try {
    const res = await Client.delete(`/users/${userId}`);
    removeToken();
    return res.data;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error.response?.data || 'Error deleting user account';
  }
};


// Token management
export const saveToken = (token) => {
  if (token) localStorage.setItem('token', token)
}

export const getToken = () => localStorage.getItem('token')

export const removeToken = () => localStorage.removeItem('token')

// Update User Profile (Username)
export const updateUserProfile = async (userId, data) => {
  try {
    const res = await Client.put(`/users/${userId}`, data)
    return res.data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error.response?.data || 'Error updating user profile'
  }
}

// Update User Password
export const updateUserPassword = async (userId, data) => {
  try {
    const res = await Client.put(`/auth/update/${userId}`, data)
    return res.data
  } catch (error) {
    console.error('Error updating user password:', error)
    throw error.response?.data || 'Error updating user password'
  }
}
