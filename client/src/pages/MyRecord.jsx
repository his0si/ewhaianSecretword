import styled from 'styled-components';
import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import ProfileSection from '../components/ProfileSection';
import RecordCard from '../components/RecordCard';
import ConfirmPopup from '../components/ConfirmPopup';
import { getCurrentUser, getUserRecords, logout, getToken } from '../api/user';
import { getTotalQuestions } from '../api/quiz';
import { formatDate, formatDuration } from '../utils/dateFormat';

// 프로필 이미지 import
import profile1 from '../assets/images/profile1.svg';
import profile2 from '../assets/images/profile2.svg';
import profile3 from '../assets/images/profile3.svg';

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

        const token = getToken();
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const [userResult, recordsResult, totalResult] = await Promise.all([
          getCurrentUser(),
          getUserRecords(),
          getTotalQuestions()
        ]);

        if (!userResult.ok) {
          if (userResult.status === 401) {
            logout();
            alert('로그인이 필요합니다. 다시 로그인해주세요.');
            window.location.href = '/login';
            return;
          }
          setError(userResult.message);
          return;
        }

        setUser(userResult.data);
        setRecords(recordsResult.ok ? recordsResult.data : []);
        setTotalQuestions(totalResult.ok ? totalResult.data : 10);

      } catch (err) {
        console.error('데이터 로딩 실패:', err);
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
    logout();
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
                date={formatDate(record.submitted_at)}
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
