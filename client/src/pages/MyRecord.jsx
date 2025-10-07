import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import ProfileSection from '../components/ProfileSection';
import RecordCard from '../components/RecordCard';
import ConfirmPopup from '../components/ConfirmPopup';
import api from '../lib/api';
import { formatDate, formatDuration } from '../utils/dateFormat';

// 프로필 이미지 import
import profile1 from '../assets/profile1.svg';
import profile2 from '../assets/profile2.svg';
import profile3 from '../assets/profile3.svg';

const Container = styled.div`
  min-height: 100vh;
  padding-top: 52px;
  padding-bottom: 56px;
  background-color: #EFF4F2;
`;

const Content = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const RecordsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 327px;
  align-items: center;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #B0B0B0;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;

  &:hover {
    color: #999;
  }
`;

const LoadingText = styled.div`
  color: #666666;
  font-size: 16px;
  text-align: center;
`;

const MyRecord = () => {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const profileImages = [profile1, profile2, profile3];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('ewhaian_token') || sessionStorage.getItem('ewhaian_token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const [userResponse, recordsResponse, totalResponse] = await Promise.all([
          api.get('/api/users/me'),
          api.get('/api/users/records'),
          api.get('/api/quiz/total')
        ]);

        setUser(userResponse.data);
        setRecords(recordsResponse.data);
        setTotalQuestions(totalResponse.data.total);

      } catch (err) {
        console.error('데이터 로딩 실패:', err);

        if (err.response?.status === 401) {
          localStorage.removeItem('ewhaian_token');
          sessionStorage.removeItem('ewhaian_token');
          alert('로그인이 필요합니다. 다시 로그인해주세요.');
          window.location.href = '/login';
          return;
        }

        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('ewhaian_token');
    sessionStorage.removeItem('ewhaian_token');
    window.location.href = '/login';
  };

  const handleLogoutCancel = () => {
    setShowLogoutPopup(false);
  };

  const getProfileImage = (userId) => {
    if (!userId) return profile1;
    return profileImages[userId % profileImages.length];
  };

  if (loading) {
    return (
      <Container>
        <Header title="내 기록" />
        <Content>
          <LoadingText>데이터를 불러오는 중...</LoadingText>
        </Content>
        <NavBar />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header title="내 기록" />
        <Content>
          <LoadingText>{error}</LoadingText>
        </Content>
        <NavBar />
      </Container>
    );
  }

  return (
    <Container>
      <Header title="내 기록" />
      <Content>
        <ProfileSection
          profileImage={getProfileImage(user?.id)}
          userName={user?.nickname || '사용자'}
        />

        <RecordsSection>
          {records.length > 0 ? (
            records.map((record, index) => (
              <RecordCard
                key={record.id}
                challengeNumber={records.length - index}
                date={formatDate(record.created_at)}
                score={record.score}
                totalQuestions={totalQuestions}
                duration={formatDuration(record.duration)}
              />
            ))
          ) : (
            <LoadingText>아직 퀴즈 기록이 없습니다.</LoadingText>
          )}
        </RecordsSection>

        <LogoutButton onClick={handleLogoutClick}>
          로그아웃
        </LogoutButton>
      </Content>
      <NavBar />
      
      <ConfirmPopup
        isOpen={showLogoutPopup}
        message="로그아웃 하시겠습니까?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </Container>
  );
};

export default MyRecord;
