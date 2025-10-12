import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Banner from '../components/Banner';
import RankingList from '../components/RankingList';
import { getLeaderboard } from '../api/leaderboard';
import { getTotalQuestions } from '../api/quiz';
import { getCurrentUser } from '../api/user';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #EFF4F2;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 52px;
  padding-bottom: 56px;
  background-color: #EFF4F2;

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Ranking = () => {
  const [rankings, setRankings] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  // 랭킹 데이터 및 총 문제 수 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rankingsResult, totalResult, userResult] = await Promise.all([
          getLeaderboard(),
          getTotalQuestions(),
          getCurrentUser()
        ]);

        if (!rankingsResult.ok) {
          setError(rankingsResult.message);
          return;
        }

        setRankings(rankingsResult.data);
        setTotalQuestions(totalResult.ok ? totalResult.data : 10);
        if (userResult.ok) {
          setCurrentUserId(userResult.data.id);
        }
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PageWrapper>
      <Container>
        <Header title="랭킹" />
        <Content>
          <Banner />
          <RankingList
            rankings={rankings}
            totalQuestions={totalQuestions}
            loading={loading}
            error={error}
            currentUserId={currentUserId}
          />
        </Content>
        <NavBar />
      </Container>
    </PageWrapper>
  );
};

export default Ranking;