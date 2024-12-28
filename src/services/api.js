import Axios from 'axios'

// Base URL for API requests
export const BASE_URL = 'http://localhost:3001'

// Create Axios client instance with the base URL
const Client = Axios.create({ baseURL: BASE_URL })

// Add an interceptor to include JWT token in the Authorization header
Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
