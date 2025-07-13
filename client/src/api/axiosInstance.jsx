import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Your backend API URL
  withCredentials: true 
});

export default axiosInstance;
