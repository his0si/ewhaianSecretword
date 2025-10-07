import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import QuizHeader from '../components/QuizHeader';
import QuizMain from '../components/QuizMain';
import QuizResult from '../components/QuizResult';
import Button from '../components/Button';
import logo from '../assets/logo.svg';
import api from '../lib/api';

const Container = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100); /* 동적 뷰포트 높이 고려 */
  padding-top: 52px; /* Header 높이만큼 여백 추가 */
  padding-bottom: 56px; /* NavBar 높이만큼 여백 추가 */
  background-color: #EFF4F2;
  box-sizing: border-box;
  overflow: hidden;
`;

const Content = styled.div`
  height: calc(100vh - 52px - 56px); /* 전체 높이에서 Header와 NavBar 높이 제외 */
  height: calc(calc(var(--vh, 1vh) * 100) - 52px - 56px); /* 동적 뷰포트 높이 사용 */
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: calc(calc(var(--vh, 1vh) * 100) - 52px - 56px - 40px); /* 추가 여백 고려 */
`;

const CenterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 24px;
  padding: 20px 0;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px; /* 네비바와의 여백 */
  margin-bottom: env(safe-area-inset-bottom, 0px); /* 갤럭시 브라우저 URL 창 고려 */
`;

const LogoContainer = styled.div`
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const Logo = styled.img`
  width: 54px;
  height: 54px;
`;

const Title = styled.h2`
  color: var(--ewha-green);
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
`;

const Description = styled.div`
  color: #808080;
  font-size: 12px;
  line-height: 1.6;
  max-width: 320px;
  margin-top: 8px;
`;


const Quiz = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // 답안 저장
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null); // 퀴즈 결과 저장

  // 갤럭시 브라우저 URL 창 변화에 대응하는 동적 뷰포트 높이 설정
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // 타이머 설정
  useEffect(() => {
    let interval = null;
    if (isQuizStarted && !isQuizCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isQuizStarted, isQuizCompleted]);

  // 퀴즈 시작 함수
  const handleStartQuiz = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/api/quiz/questions');
      setQuestions(response.data);
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      setTimeElapsed(0);
      setAnswers({}); // 답안 초기화
      setQuizResult(null); // 결과 초기화
    } catch (err) {
      console.error('퀴즈 데이터 로딩 실패:', err);
      setError('퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  // 퀴즈 종료 함수
  const handleBackToStart = () => {
    setIsQuizStarted(false);
    setIsQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setTimeElapsed(0);
    setQuestions([]);
    setAnswers({});
    setQuizResult(null);
  };

  // 이전 문제로 이동
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 다음 문제로 이동
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 힌트 보기
  const handleShowHint = () => {
    // 힌트 기능은 나중에 구현
    alert('힌트 기능은 준비 중입니다.');
  };

  // 답안 변경 핸들러
  const handleAnswerChange = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  // 완료 버튼 클릭
  const handleComplete = async () => {
    if (window.confirm('답안을 제출하시겠습니까?')) {
      setIsSubmitting(true);
      
      try {
        // 모든 문제에 대한 답안 배열 생성 (빈 답안은 빈 문자열로)
        const answersArray = questions.map((_, index) => answers[index] || '');
        
        const response = await api.post('/api/quiz/submit', {
          answers: answersArray
        });
        
        // 퀴즈 완료 상태로 변경하고 결과 저장
        setIsQuizCompleted(true);
        setQuizResult({
          score: response.data.score,
          totalQuestions: questions.length,
          timeElapsed: formatResultTime(timeElapsed),
          results: response.data.results || []
        });
        
      } catch (err) {
        console.error('답안 제출 실패:', err);
        if (err.response?.status === 409) {
          alert('이미 퀴즈를 제출했습니다.');
        } else {
          alert('답안 제출에 실패했습니다. 다시 시도해주세요.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // 시간 포맷팅 (초를 MM:SS 형식으로)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 결과용 시간 포맷팅 (초를 MM분 SS초 형식으로)
  const formatResultTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}분 ${secs.toString().padStart(2, '0')}초`;
  };

  // 이화담 정보 버튼 클릭
  const handleEventInfo = () => {
    alert('이화담 행사 정보는 준비 중입니다.');
  };

  // 랭킹 보기 버튼 클릭
  const handleRanking = () => {
    // 랭킹 페이지로 이동 (라우팅 구현 필요)
    alert('랭킹 페이지로 이동합니다.');
  };

  // 퀴즈 완료 후 결과 화면
  if (isQuizCompleted && quizResult) {
    return (
      <>
        <QuizResult
          score={quizResult.score}
          totalQuestions={quizResult.totalQuestions}
          timeElapsed={quizResult.timeElapsed}
          results={quizResult.results}
          onEventInfo={handleEventInfo}
          onRanking={handleRanking}
        />
        <NavBar />
      </>
    );
  }

  // 퀴즈 진행 중일 때
  if (isQuizStarted) {
    return (
      <Container>
        <QuizHeader 
          timeElapsed={formatTime(timeElapsed)}
          progress={((currentQuestionIndex + 1) / questions.length) * 100}
        />
        <QuizMain
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
          questionText={questions[currentQuestionIndex]?.hint || "문제를 불러오는 중..."}
          currentAnswer={answers[currentQuestionIndex] || ''}
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          onHint={handleShowHint}
          onAnswerChange={handleAnswerChange}
          onEnter={handleNextQuestion}
          onComplete={handleComplete}
          isSubmitting={isSubmitting}
        />
        <NavBar />
      </Container>
    );
  }

  // 퀴즈 시작 전 화면
  return (
    <Container>
      <Header title="퀴즈 풀기" />
      <Content>
        <CenterSection>
          <LogoContainer>
            <Logo src={logo} alt="이화이언 로고" />
          </LogoContainer>
          
          <Title>이화이언 비밀번호<br />퀴즈 풀 준비 되셨나요?</Title>
          
          <Description>
            퀴즈 풀기를 시작하면 문제를 푸는 시간이 기록되며,<br />
            빠르고 정확하게 정답을 맞추는대로 순위가 매겨져요.
          </Description>
        </CenterSection>
        
        <ButtonSection>
          {error && (
            <div style={{ color: 'red', fontSize: '12px', marginBottom: '10px' }}>
              {error}
            </div>
          )}
          <Button onClick={handleStartQuiz} disabled={isLoading}>
            {isLoading ? '퀴즈 불러오는 중...' : '시작하기'}
          </Button>
        </ButtonSection>
      </Content>
      <NavBar />
    </Container>
  );
};

export default Quiz;