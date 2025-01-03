import axios from 'axios'

const Client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
})

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default Client
