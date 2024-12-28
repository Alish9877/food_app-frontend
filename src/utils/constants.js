// Base URL for the API
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001'

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CHECK_SESSION: '/auth/session',
  MEAL_PLANS: '/meal-plans',
  SUBSCRIPTIONS: '/subscriptions',
  DELIVERIES: '/deliveries'
}

// User roles
export const ROLES = {
  ADMIN: 'Admin',
  USER: 'Subscriber'
}
