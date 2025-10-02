// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// 나중에 회원가입 페이지도 import 하면 됨
// import RegisterPage from "./pages/register/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 기본 경로("/")에 들어오면 /login으로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<LoginPage />} />

        {/* 회원가입 페이지 (나중에 추가) */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
