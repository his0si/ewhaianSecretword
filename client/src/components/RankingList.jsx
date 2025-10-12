import styled from 'styled-components';
import RankingCard from './RankingCard';

const RankingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: center;
`;

const LoadingText = styled.div`
  color: #666666;
  font-size: 16px;
  text-align: center;
`;

const ErrorText = styled.div`
  color: #ff6b6b;
  font-size: 16px;
  text-align: center;
`;

const RankingList = ({ rankings, totalQuestions, loading, error, currentUserId, userCardRef }) => {
  if (loading) {
    return (
      <RankingListContainer>
        <LoadingText>랭킹을 불러오는 중...</LoadingText>
      </RankingListContainer>
    );
  }

  if (error) {
    return (
      <RankingListContainer>
        <ErrorText>{error}</ErrorText>
      </RankingListContainer>
    );
  }

  if (!rankings || rankings.length === 0) {
    return (
      <RankingListContainer>
        <LoadingText>아직 랭킹 데이터가 없습니다.</LoadingText>
      </RankingListContainer>
    );
  }

  return (
    <RankingListContainer>
      {rankings.map((ranking, index) => {
        const isCurrentUser = ranking.user?.id === currentUserId;
        return (
          <RankingCard
            key={ranking.id || index}
            ref={isCurrentUser ? userCardRef : null}
            rank={index + 1}
            user={ranking.user}
            score={ranking.score}
            totalQuestions={totalQuestions}
            duration={ranking.duration}
            isCurrentUser={isCurrentUser}
          />
        );
      })}
    </RankingListContainer>
  );
};

export default RankingList;
