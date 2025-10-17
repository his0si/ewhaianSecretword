import styled from 'styled-components';
import { useState, useEffect, useRef } from 'react';
import AnswerInput from './AnswerInput';

const QuizContainer = styled.div`
  position: fixed;
  top: 152px; /* 헤더(52px) + 진행바(32px + 8px + 20px) + 네비게이션(40px) */
  left: 0;
  right: 0;
  bottom: 56px; /* NavBar 높이 */
  padding: 20px;
  background-color: #EFF4F2;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* 키보드가 나타날 때 스크롤 방지 */
  &.keyboard-open {
    overflow-y: hidden;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 0;

  @media (min-width: 768px) {
    max-width: 460px;
  }
`;

const QuizCard = styled.div`
  width: 100%;
  background-color: #C8DAD3;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  min-height: 200px;
  height: ${props => props.$isKeyboardOpen ? 'auto' : '240px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: height 0.2s ease;
  box-sizing: border-box;
`;

const HintBadge = styled.div`
  background-color: #4B9C80;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const QuestionText = styled.div`
  font-size: ${props => props.$isKeyboardOpen ? '28px' : '40px'};
  font-weight: bold;
  color: var(--ewha-green);
  line-height: 1.4;
  min-height: ${props => props.$isKeyboardOpen ? '40px' : '60px'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: font-size 0.2s ease, min-height 0.2s ease;
`;

const InputWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 24px;
  margin-bottom: ${props => props.$isKeyboardOpen ? '0' : '20px'};
  transition: margin-bottom 0.2s ease;
`;


/**
 * 퀴즈 메인 컴포넌트
 * - 퀴즈 카드와 입력창 포함
 * @param {string} questionText - 현재 문제 텍스트
 * @param {string} currentAnswer - 현재 입력된 답안
 * @param {function} onAnswerChange - 답안 변경 핸들러
 * @param {function} onEnter - Enter 키 입력 시 호출되는 핸들러
 */
const QuizMain = ({
  questionText = "문제를 불러오는 중...",
  currentAnswer = '',
  onAnswerChange,
  onEnter
}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      // 모바일에서 viewport 높이 변화로 키보드 감지
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;

        // viewport가 window보다 150px 이상 작아지면 키보드가 열린 것으로 판단
        setIsKeyboardOpen(windowHeight - viewportHeight > 150);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      }
    };
  }, []);

  return (
    <QuizContainer ref={containerRef} className={isKeyboardOpen ? 'keyboard-open' : ''}>
      <ContentWrapper>
        <QuizCard $isKeyboardOpen={isKeyboardOpen}>
          <HintBadge>
            힌트
          </HintBadge>

          <QuestionText $isKeyboardOpen={isKeyboardOpen}>
            {questionText}
          </QuestionText>
        </QuizCard>

        <InputWrapper $isKeyboardOpen={isKeyboardOpen}>
          <AnswerInput
            ref={inputRef}
            value={currentAnswer}
            onChange={onAnswerChange}
            onEnter={onEnter}
            placeholder="정답 입력하기"
          />
        </InputWrapper>
      </ContentWrapper>
    </QuizContainer>
  );
};

export default QuizMain;
