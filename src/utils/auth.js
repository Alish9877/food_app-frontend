// Save a token to local storage
export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

// Get the saved token from local storage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove the token from local storage
export const removeToken = () => {
  localStorage.removeItem('token');
};

