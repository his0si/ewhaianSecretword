import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Quiz from './pages/Quiz';
import MyRecord from './pages/MyRecord';
import Ranking from './pages/Ranking';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* 기본 경로는 퀴즈 페이지로 이동 */}
        <Route path="/" element={<Quiz />} />
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