// src/utils/axiosInstance.js

import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001',
});

export default httpRequest;
