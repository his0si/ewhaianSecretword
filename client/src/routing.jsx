import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Quiz from './pages/Quiz';
import MyRecord from './pages/MyRecord';
import Ranking from './pages/Ranking';
import QuizResultPage from './pages/QuizResult';

import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegistrationPage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 기본 경로는 퀴즈 페이지로 이동 */}
        <Route path="/" element={<Quiz />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} /> 
        
        {/* 보호된 라우트: 로그인이 필요한 페이지 */}
        <Route path="/quiz" element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } />
        <Route path="/myrecord" element={
          <ProtectedRoute>
            <MyRecord />
          </ProtectedRoute>
        } />
        <Route path="/quiz-result" element={
          <ProtectedRoute>
            <QuizResultPage />
          </ProtectedRoute>
        } />
        <Route path="/ranking" element={
          <ProtectedRoute>
            <Ranking />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;