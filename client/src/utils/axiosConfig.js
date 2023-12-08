import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://learn-anything-b61f2394c70a.herokuapp.com/',
  // baseURL:'http://localhost:8000';
  withCredentials: true,
});

export default axiosInstance;
