import styled from 'styled-components';

const Card = styled.div`
  width: 327px;
  height: 77px;
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChallengeTitle = styled.div`
  color: var(--ewha-green);
  font-size: 14px;
  font-weight: 600;
`;

const ChallengeDate = styled.div`
  color: #000000;
  font-size: 13px;
  font-weight: 400;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Score = styled.div`
  color: var(--ewha-green);
  font-size: 12px;
  font-weight: 600;
`;

const Duration = styled.div`
  color: #B0B0B0;
  font-size: 12px;
  font-weight: 400;
`;

const RecordCard = ({ challengeNumber, date, score, totalQuestions = 10, duration }) => {
  return (
    <Card>
      <LeftSection>
        <ChallengeTitle>{challengeNumber}번째 도전</ChallengeTitle>
        <ChallengeDate>{date}</ChallengeDate>
      </LeftSection>
      <RightSection>
        <Score>{score}/{totalQuestions}</Score>
        <Duration>{duration}</Duration>
      </RightSection>
    </Card>
  );
};

export default RecordCard;
