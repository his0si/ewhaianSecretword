import styled from 'styled-components';
import { useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import QuizHeader from '../components/QuizHeader';
import QuizMain from '../components/QuizMain';
import QuizResult from '../components/QuizResult';
import QuizStartScreen from '../components/QuizStartScreen';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { useViewportHeight } from '../hooks/useViewportHeight';
import { formatTime, formatResultTime } from '../utils/timeFormat';
import api from '../lib/api';

const Container = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  padding-top: 52px;
  padding-bottom: 56px;
  background-color: #EFF4F2;
  box-sizing: border-box;
  overflow: hidden;
`;

const Content = styled.div`
  height: calc(100vh - 52px - 56px);
  height: calc(calc(var(--vh, 1vh) * 100) - 52px - 56px);
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  min-height: calc(calc(var(--vh, 1vh) * 100) - 52px - 56px - 40px);
`;

const Quiz = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  const { timeElapsed, resetTimer } = useQuizTimer(isQuizStarted, isQuizCompleted);
  useViewportHeight();

  const handleStartQuiz = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get('/api/quiz/questions');
      setQuestions(response.data);
      setIsQuizStarted(true);
      setIsQuizCompleted(false);
      resetTimer();
      setAnswers({});
      setQuizResult(null);
    } catch (err) {
      console.error('퀴즈 데이터 로딩 실패:', err);
      setError('퀴즈를 불러오는데 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleShowHint = () => {
    alert('힌트 기능은 준비 중입니다.');
  };

  const handleAnswerChange = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleComplete = async () => {
    if (window.confirm('답안을 제출하시겠습니까?')) {
      setIsSubmitting(true);

      try {
        const answersArray = questions.map((_, index) => answers[index] || '');

        const response = await api.post('/api/quiz/submit', {
          answers: answersArray,
          duration: timeElapsed
        });

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

  const handleEventInfo = () => {
    alert('이화담 행사 정보는 준비 중입니다.');
  };

  const handleRanking = () => {
    alert('랭킹 페이지로 이동합니다.');
  };

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

  return (
    <Container>
      <Header title="퀴즈 풀기" />
      <Content>
        <QuizStartScreen
          onStart={handleStartQuiz}
          isLoading={isLoading}
          error={error}
        />
      </Content>
      <NavBar />
    </Container>
  );
};

export default Quiz;
