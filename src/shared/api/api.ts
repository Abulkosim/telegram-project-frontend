import axios from 'axios';

const API_URL = 'http://localhost:3000/api/'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (username: string, email: string, password: string) =>
    api.post('/auth/register', { username, email, password }),
};

export const userApi = {
  getProfile: (id: string) => api.get(`/user/profile/${id}`),
  updateProfile: (id: string, userData: any) => api.put(`/user/profile/${id}`, userData),
  deleteUser: (id: string) => api.delete(`/user/profile/${id}`),
  getAllUsers: () => api.get('/user/all'),
}

export default api;