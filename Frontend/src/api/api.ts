import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    // Apply the token to every request header
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    // Delete the auth header
    delete api.defaults.headers.common['Authorization']
  }
}

export default api
