import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';

const Container = styled.div`
  min-height: 100vh;
  padding-top: 52px; /* Header 높이만큼 여백 추가 */
  padding-bottom: 56px; /* NavBar 높이만큼 여백 추가 */
  background-color: #EFF4F2;
`;

const Content = styled.div`
  padding: 20px;
  text-align: center;
`;

const Description = styled.p`
  color: #666666;
  font-size: 16px;
`;

const MyRecord = () => {
  return (
    <Container>
      <Header title="내 기록" />
      <Content>
        <Description>내 기록 내용이 여기에 표시됩니다.</Description>
      </Content>
      <NavBar />
    </Container>
  );
};

export default MyRecord;