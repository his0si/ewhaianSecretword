import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Quiz from './pages/Quiz';
import MyRecord from './pages/MyRecord';
import Ranking from './pages/Ranking';

import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegistrationPage";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 기본 경로는 로그인 페이지로 이동 */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} /> 
        {/* 퀴즈 페이지 */}
        <Route path="/quiz" element={<Quiz />} />
        {/* 내 기록 페이지 */}
        <Route path="/myrecord" element={<MyRecord />} />
        {/* 랭킹 페이지 */}
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;