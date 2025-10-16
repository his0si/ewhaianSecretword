import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import QuizResult from '../components/QuizResult';

const QuizResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const record = location.state?.record;

  // 페이지 진입 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // record 데이터가 없으면 내 기록 페이지로 리다이렉트
  useEffect(() => {
    if (!record) {
      navigate('/myrecord');
    }
  }, [record, navigate]);

  const handleEventInfo = () => {
    window.open('https://ewhadam-padlet.com', '_blank', 'noopener,noreferrer');
  };

  const handleRanking = () => {
    navigate('/ranking', { state: { scrollToUser: true } });
  };

  if (!record) {
    return null;
  }

  return (
    <>
      <QuizResult
        score={record.score}
        totalQuestions={record.total_questions || 10}
        timeElapsed={record.duration_formatted || '00분 00초'}
        results={record.results || []}
        onEventInfo={handleEventInfo}
        onRanking={handleRanking}
      />
      <NavBar />
    </>
  );
};

export default QuizResultPage;
