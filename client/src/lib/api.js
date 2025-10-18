import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
});

// 모든 요청에 JWT 토큰을 자동으로 추가하는 인터셉터
api.interceptors.request.use((config) => {
  // localStorage 또는 sessionStorage에서 토큰 가져오기
  const token = localStorage.getItem('ewhaian_token') || sessionStorage.getItem('ewhaian_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;   
