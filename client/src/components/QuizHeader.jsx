import styled from 'styled-components';
import logo from '../assets/images/logo.svg';
import nextIcon from '../assets/images/next.svg';
import neurimboFont from '../assets/fonts/neurimboGothicRegular.otf';

const QuizHeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

const ProgressBarWrapper = styled.div`
  position: absolute;
  top: 52px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  margin-top: 32px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    max-width: 460px;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: var(--ewha-green);
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;


const Logo = styled.img`
  width: 26px;
  height: 26px;
`;

const Title = styled.h1`
  color: var(--ewha-green);
  font-size: 11px;
  font-weight: 600;
  margin: 0;
  margin-left: 8px;
  line-height: 1.2;
  font-family: 'NeurimboGothic', sans-serif;

  @font-face {
    font-family: 'NeurimboGothic';
    src: url(${neurimboFont}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimerBadge = styled.div`
  background-color: #ffffff;
  color: var(--ewha-green);
  width: 97px;
  height: 30px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const NavigationWrapper = styled.div`
  position: absolute;
  top: 107px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);

  @media (min-width: 768px) {
    max-width: 460px;
  }
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
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #4a7c59;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

/**
 * 퀴즈 진행 중 헤더 컴포넌트
 * - 로고, 타이머, 진행바, 네비게이션 포함
 * @param {string} timeElapsed - 경과 시간 (MM:SS 형식)
 * @param {number} progress - 진행률 (0-100)
 * @param {number} currentQuestion - 현재 문제 번호
 * @param {number} totalQuestions - 전체 문제 수
 * @param {function} onPrevious - 이전 버튼 핸들러
 * @param {function} onNext - 다음 버튼 핸들러
 * @param {function} onComplete - 완료 버튼 핸들러
 * @param {boolean} isSubmitting - 제출 중 여부
 */
const QuizHeader = ({
  timeElapsed = "00:00",
  progress = 0,
  currentQuestion = 0,
  totalQuestions = 10,
  onPrevious,
  onNext,
  onComplete,
  isSubmitting = false
}) => {
  return (
    <>
      <QuizHeaderContainer>
        <LeftSection>
          <Logo src={logo} alt="이화이언 로고" />
          <TitleContainer>
            <Title>이화이언</Title>
            <Title>비밀번호 퀴즈</Title>
          </TitleContainer>
        </LeftSection>

        <RightSection>
          <TimerBadge>소요시간 {timeElapsed}</TimerBadge>
        </RightSection>
      </QuizHeaderContainer>

      <ProgressBarWrapper>
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>
      </ProgressBarWrapper>

      <NavigationWrapper>
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
      </NavigationWrapper>
    </>
  );
};

export default QuizHeader;
