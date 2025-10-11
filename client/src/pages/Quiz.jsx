import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import QuizHeader from '../components/QuizHeader';
import QuizMain from '../components/QuizMain';
import QuizResult from '../components/QuizResult';
import QuizStartScreen from '../components/QuizStartScreen';
import ConfirmPopup from '../components/ConfirmPopup';
import { useQuizTimer } from '../hooks/useQuizTimer';
import { useViewportHeight } from '../hooks/useViewportHeight';
import { formatTime, formatResultTime } from '../utils/timeFormat';
import { getQuestions, submitQuiz } from '../api/quiz';

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
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
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
  const navigate = useNavigate();
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [showSubmitPopup, setShowSubmitPopup] = useState(false);

  const { timeElapsed, resetTimer } = useQuizTimer(isQuizStarted, isQuizCompleted);
  useViewportHeight();

  const handleStartQuiz = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getQuestions();
      if (!result.ok) {
        setError(result.message);
        return;
      }

      setQuestions(result.data);
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
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
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

  const handleCompleteClick = () => {
    setShowSubmitPopup(true);
  };

  const handleSubmitConfirm = async () => {
    setShowSubmitPopup(false);
    setIsSubmitting(true);

    try {
      const answersArray = questions.map((_, index) => answers[index] || '');
      const result = await submitQuiz({ answers: answersArray, duration: timeElapsed });

      if (!result.ok) {
        if (result.status === 409) {
          alert('이미 퀴즈를 제출했습니다.');
        } else {
          alert(result.message);
        }
        return;
      }

      setIsQuizCompleted(true);
      setQuizResult({
        score: result.data.score,
        totalQuestions: questions.length,
        timeElapsed: formatResultTime(timeElapsed),
        results: result.data.results || []
      });

    } catch (err) {
      console.error('답안 제출 실패:', err);
      alert('답안 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitCancel = () => {
    setShowSubmitPopup(false);
  };

  const navigateToEventInfo = () => {
    alert('이화담 행사 정보는 준비 중입니다.');
  };

  const navigateToRanking = () => {
    navigate('/ranking');
  };

  if (isQuizCompleted && quizResult) {
    return (
      <>
        <QuizResult
          score={quizResult.score}
          totalQuestions={quizResult.totalQuestions}
          timeElapsed={quizResult.timeElapsed}
          results={quizResult.results}
          onEventInfo={navigateToEventInfo}
          onRanking={navigateToRanking}
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
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
          onPrevious={handlePreviousQuestion}
          onNext={handleNextQuestion}
          onComplete={handleCompleteClick}
          isSubmitting={isSubmitting}
        />
        <QuizMain
          questionText={questions[currentQuestionIndex]?.hint || "문제를 불러오는 중..."}
          currentAnswer={answers[currentQuestionIndex] || ''}
          onHint={handleShowHint}
          onAnswerChange={handleAnswerChange}
          onEnter={currentQuestionIndex === questions.length - 1 ? handleCompleteClick : handleNextQuestion}
        />
        <NavBar />

        <ConfirmPopup
          isOpen={showSubmitPopup}
          message="답안을 제출하시겠습니까?"
          onConfirm={handleSubmitConfirm}
          onCancel={handleSubmitCancel}
        />
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
