import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // localStorage 또는 sessionStorage에서 토큰 확인
  const token = localStorage.getItem('ewhaian_token') || sessionStorage.getItem('ewhaian_token');
  
  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // 토큰이 있으면 요청한 페이지 렌더링
  return children;
};

export default ProtectedRoute;

