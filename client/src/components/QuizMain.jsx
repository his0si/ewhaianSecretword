import styled from 'styled-components';
import { useState } from 'react';
import AnswerInput from './AnswerInput';
import nextIcon from '../assets/next.svg';

const QuizContainer = styled.div`
  padding-top: 112px; /* 헤더 + 진행바 높이만큼 여백 */
  padding: 20px;
  background-color: #EFF4F2;
  min-height: calc(100vh - 52px);
  box-sizing: border-box;
`;

const ProgressSection = styled.div`
  margin-bottom: 32px;
  margin-top: 32px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: var(--ewha-green);
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const NavigationSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const QuestionCounter = styled.div`
  color: #B0B0B0;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  text-align: center;
  
  span {
    color: var(--ewha-green);
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    opacity: 0.7;
  }
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const CompleteNavButton = styled.button`
  background-color: var(--ewha-green);
  color: white;
  border: none;
  border-radius: 14px;
  height: 30px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  min-width: 46px;
  writing-mode: horizontal-tb;
  text-orientation: mixed;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background-color: #4a7c59;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const QuizCard = styled.div`
  background-color: #C8DAD3;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HintButton = styled.button`
  background-color: #4B9C80;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  
  &:hover {
    background-color: #3d7a66;
  }
`;

const QuestionText = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: var(--ewha-green);
  line-height: 1.4;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


/**
 * 퀴즈 메인 컴포넌트
 * - 진행률 바, 네비게이션, 퀴즈 카드 포함
 * @param {number} currentQuestion - 현재 문제 번호 (0부터 시작)
 * @param {number} totalQuestions - 전체 문제 수
 * @param {string} questionText - 현재 문제 텍스트
 * @param {string} currentAnswer - 현재 입력된 답안
 * @param {function} onPrevious - 이전 문제로 이동
 * @param {function} onNext - 다음 문제로 이동
 * @param {function} onHint - 힌트 보기
 * @param {function} onAnswerChange - 답안 변경 핸들러
 * @param {function} onEnter - Enter 키 입력 시 호출되는 핸들러
 * @param {function} onComplete - 완료 버튼 클릭 핸들러
 * @param {boolean} isSubmitting - 제출 중인지 여부
 */
const QuizMain = ({
  currentQuestion = 0,
  totalQuestions = 10,
  questionText = "문제를 불러오는 중...",
  currentAnswer = '',
  onPrevious,
  onNext,
  onHint,
  onAnswerChange,
  onEnter,
  onComplete,
  isSubmitting = false
}) => {
  return (
    <QuizContainer>
      <ProgressSection>
        <NavigationSection>
          <div style={{ width: '32px' }}>
            {currentQuestion > 0 && (
              <ArrowButton onClick={onPrevious}>
                <ArrowIcon src={nextIcon} alt="이전" style={{ transform: 'scaleX(-1)' }} />
              </ArrowButton>
            )}
          </div>

          <QuestionCounter>
            <span>{currentQuestion + 1}</span>/{totalQuestions}
          </QuestionCounter>

          <div style={{ width: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            {currentQuestion < totalQuestions - 1 ? (
              <ArrowButton onClick={onNext}>
                <ArrowIcon src={nextIcon} alt="다음" />
              </ArrowButton>
            ) : (
              <CompleteNavButton onClick={onComplete} disabled={isSubmitting}>
                {isSubmitting ? '제출중' : '완료'}
              </CompleteNavButton>
            )}
          </div>
        </NavigationSection>
      </ProgressSection>

      <QuizCard>
        <HintButton onClick={onHint}>
          힌트
        </HintButton>

        <QuestionText>
          {questionText}
        </QuestionText>
      </QuizCard>
      
      <AnswerInput
        value={currentAnswer}
        onChange={onAnswerChange}
        onEnter={currentQuestion === totalQuestions - 1 ? onComplete : onNext}
        placeholder="정답 입력하기"
      />
    </QuizContainer>
  );
};

export default QuizMain;
