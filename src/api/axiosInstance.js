import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://tdtlworld.com/gramin-ai-backend/',
  // baseURL: 'http://127.0.0.1:8000/',

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
