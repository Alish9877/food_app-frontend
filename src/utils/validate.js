// Check if an email is in a valid format
export const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(email)
}

// Check if a password meets basic criteria
export const isValidPassword = (password) => {
  // Example: Password must be at least 8 characters long
  return password.length >= 8
}

// Check if a required field is empty
export const isEmpty = (value) => {
  return value.trim() === ''
}
