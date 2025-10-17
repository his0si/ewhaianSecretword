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

// 응답 인터셉터: 401 에러 시 자동으로 로그인 페이지로 리다이렉트
api.interceptors.response.use(
  (response) => {
    // 성공 응답은 그대로 반환
    return response;
  },
  (error) => {
    // 401 Unauthorized 에러 처리
    if (error.response && error.response.status === 401) {
      // 토큰 삭제
      localStorage.removeItem('ewhaian_token');
      sessionStorage.removeItem('ewhaian_token');
      
      // 현재 로그인 페이지가 아닌 경우에만 리다이렉트
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;   
