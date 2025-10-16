import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import ProfileSection from '../components/ProfileSection';
import RecordCard from '../components/RecordCard';
import ConfirmPopup from '../components/ConfirmPopup';
import { getCurrentUser, getUserRecords, logout, getToken } from '../api/user';
import { getTotalQuestions } from '../api/quiz';
import { formatDate, formatDuration, getProfileImage } from '../utils';
import { PageWrapper, Container, Content as BaseContent, LoadingText } from '../styles/commonStyles';

const Content = styled(BaseContent)`
  gap: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: calc(calc(var(--vh, 1vh) * 100) - 52px - 56px);
  padding-bottom: 40px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  flex: 1;
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
  margin-bottom: 24px;

  &:hover {
    color: #999;
  }
`;

const MyRecord = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // 페이지 진입 시 스크롤 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleRecordClick = (record, index) => {
    // answers 필드를 파싱 (백엔드에서 JSON 문자열로 저장됨)
    let results = [];
    try {
      results = typeof record.answers === 'string'
        ? JSON.parse(record.answers)
        : record.answers || [];
    } catch (err) {
      console.error('answers 파싱 실패:', err);
      results = [];
    }

    // 퀴즈 결과 페이지로 이동하면서 record 데이터 전달
    navigate('/quiz-result', {
      state: {
        record: {
          ...record,
          challenge_number: records.length - index,
          total_questions: totalQuestions,
          duration_formatted: formatDuration(record.duration),
          results // 파싱된 results 추가
        }
      }
    });
  };

  if (loading) {
    return (
      <PageWrapper>
        <Container>
          <Header title="내 기록" />
          <Content>
            <LoadingText>데이터를 불러오는 중...</LoadingText>
          </Content>
          <NavBar />
        </Container>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Container>
          <Header title="내 기록" />
          <Content>
            <LoadingText>{error}</LoadingText>
          </Content>
          <NavBar />
        </Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Header title="내 기록" />
        <Content>
          <ContentWrapper>
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
                    onClick={() => handleRecordClick(record, index)}
                  />
                ))
              ) : (
                <LoadingText>아직 퀴즈 기록이 없습니다.</LoadingText>
              )}
            </RecordsSection>
          </ContentWrapper>

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
    </PageWrapper>
  );
};

export default MyRecord;
