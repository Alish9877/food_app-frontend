import axios from 'axios'

// Create Axios instance with base URL
const Client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
})

// Add token to headers if it exists in localStorage
Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default Client
