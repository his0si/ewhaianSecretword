import styled from 'styled-components';
import Button from './Button';
import logo from '../assets/images/logo.svg';

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
  padding-bottom: 20px;
  margin-bottom: env(safe-area-inset-bottom, 0px);
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

const ErrorText = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

const QuizStartScreen = ({ onStart, isLoading, error }) => {
  return (
    <>
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
        {error && <ErrorText>{error}</ErrorText>}
        <Button onClick={onStart} disabled={isLoading}>
          {isLoading ? '퀴즈 불러오는 중...' : '시작하기'}
        </Button>
      </ButtonSection>
    </>
  );
};

export default QuizStartScreen;
