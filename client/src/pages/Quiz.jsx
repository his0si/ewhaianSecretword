import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Button from '../components/Button';
import logo from '../assets/logo.svg';

const Container = styled.div`
  height: 100vh;
  padding-top: 52px; /* Header 높이만큼 여백 추가 */
  padding-bottom: 56px; /* NavBar 높이만큼 여백 추가 */
  background-color: #EFF4F2;
  box-sizing: border-box;
  overflow: hidden;
`;

const Content = styled.div`
  height: calc(100vh - 52px - 56px); /* 전체 높이에서 Header와 NavBar 높이 제외 */
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  box-sizing: border-box;
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
  return (
    <Container>
      <Header title="퀴즈 풀기" />
      <Content>
        <LogoContainer>
          <Logo src={logo} alt="이화이언 로고" />
        </LogoContainer>
        
        <Title>이화이언 비밀번호<br />퀴즈 풀 준비 되셨나요?</Title>
        
        <Description>
          퀴즈 풀기를 시작하면 문제를 푸는 시간이 기록되며,<br />
          빠르고 정확하게 정답을 맞추는대로 순위가 매겨져요.
        </Description>
        
        <Button>시작하기</Button>
      </Content>
      <NavBar />
    </Container>
  );
};

export default Quiz;