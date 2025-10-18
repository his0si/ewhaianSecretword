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

// 401 에러 발생 시 로그인 페이지로 리다이렉트하는 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 삭제
      localStorage.removeItem('ewhaian_token');
      sessionStorage.removeItem('ewhaian_token');
      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;   
