import styled from 'styled-components';
import Button from './Button';
import logo from '../assets/images/logo.svg';
import trueIcon from '../assets/images/true.svg';
import falseIcon from '../assets/images/false.svg';

const ResultContainer = styled.div`
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  padding-top: 52px;
  padding-bottom: 80px;
  background-color: #EFF4F2;
  box-sizing: border-box;
  overflow-y: auto;
`;

const ResultContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 52px - 56px);
  min-height: calc(calc(var(--vh, 1vh) * 100) - 52px - 56px);
`;

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
`;

const ScoreText = styled.h2`
  color: var(--ewha-green);
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 12px 0;
  text-align: center;
`;

const TimeText = styled.div`
  background-color: white;
  color: var(--ewha-green);
  width: 130px;
  height: 30px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 400;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: 12px;
    font-weight: 600;
    margin-left: 4px;
  }
`;

const ResultsCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  margin-bottom: 24px;
  box-sizing: border-box;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

const QuestionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const QuestionNumber = styled.div`
  width: 30px;
  height: 27px;
  background-color: #A1C1B5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

const ResultIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const InfoSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
  max-width: 320px;
`;

const InfoTitle = styled.div`
  color: var(--ewha-green);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const InfoText = styled.div`
  color: #5E5E5E;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 280px;
`;

/**
 * 퀴즈 결과 화면 컴포넌트
 * @param {number} score - 맞은 문제 수
 * @param {number} totalQuestions - 전체 문제 수
 * @param {string} timeElapsed - 소요 시간 (MM:SS 형식)
 * @param {Array} results - 각 문제의 정답 여부 배열
 * @param {function} onEventInfo - 이화담 정보 버튼 클릭 핸들러
 * @param {function} onRanking - 랭킹 보기 버튼 클릭 핸들러
 */
const QuizResult = ({
  score = 0,
  totalQuestions = 10,
  timeElapsed = "00:00",
  results = [],
  onEventInfo,
  onRanking
}) => {
  // 결과 아이콘 생성
  const renderResultIcon = (isCorrect, index) => {
    if (isCorrect) {
      return <ResultIcon src={trueIcon} alt="정답" />;
    } else {
      return <ResultIcon src={falseIcon} alt="오답" />;
    }
  };

  return (
    <ResultContainer>
      <ResultContent>
        <LogoSection>
          <Logo src={logo} alt="이화이언 로고" />
          <ScoreText>{totalQuestions}문제 중 {score}문제 정답!</ScoreText>
          <TimeText>
            총 소요시간<span> {timeElapsed}</span>
          </TimeText>
        </LogoSection>

        <ResultsCard>
          <ResultsGrid>
            {Array.from({ length: totalQuestions }, (_, index) => (
              <QuestionItem key={index}>
                <QuestionNumber>{index + 1}</QuestionNumber>
                {renderResultIcon(results[index]?.isCorrect || false, index)}
              </QuestionItem>
            ))}
          </ResultsGrid>
        </ResultsCard>

        <InfoSection>
          <InfoTitle>틀린 문제와 정답이 무엇인지 궁금하다면?</InfoTitle>
          <InfoText>
            11월 5일, 중강당에서 진행되는 이화이언 행사 '이화담'에<br />
            방문하시면 정답 힌트를 알려드립니다 🍀
          </InfoText>
        </InfoSection>

        <ButtonSection>
          <Button onClick={onEventInfo}>
            이화담 자세히 알아보기
          </Button>
          <Button onClick={onRanking}>
            랭킹 보기
          </Button>
        </ButtonSection>
      </ResultContent>
    </ResultContainer>
  );
};

export default QuizResult;
