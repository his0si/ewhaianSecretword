import styled from 'styled-components';
import logo from '../assets/images/logo.svg';
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
  left: 20px;
  right: 20px;
  width: calc(100% - 40px);
  margin-top: 32px;
  margin-bottom: 20px;
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

/**
 * 퀴즈 진행 중 헤더 컴포넌트
 * - 로고, 타이머, 진행바 포함
 * @param {string} timeElapsed - 경과 시간 (MM:SS 형식)
 * @param {number} progress - 진행률 (0-100)
 */
const QuizHeader = ({ timeElapsed = "00:00", progress = 0 }) => {
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
    </>
  );
};

export default QuizHeader;
