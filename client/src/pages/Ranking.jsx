import styled from 'styled-components';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [rankings, setRankings] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const userCardRef = useRef(null);

  // 페이지 진입 시 스크롤 최상단으로 이동 (퀴즈 결과에서 온 경우 제외)
  useEffect(() => {
    if (!location.state?.scrollToUser) {
      window.scrollTo(0, 0);
    }
  }, [location]);

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

  // 데이터 로딩 완료 후 사용자 카드로 스크롤 (퀴즈 결과에서 온 경우만)
  useEffect(() => {
    if (!loading && location.state?.scrollToUser && currentUserId && userCardRef.current) {
      // 약간의 지연을 두고 스크롤 (렌더링 완료 대기)
      setTimeout(() => {
        userCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [loading, location.state?.scrollToUser, currentUserId]);

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
            userCardRef={userCardRef}
          />
        </Content>
        <NavBar />
      </Container>
    </PageWrapper>
  );
};

export default Ranking;