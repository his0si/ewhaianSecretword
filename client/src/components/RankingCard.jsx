import styled from 'styled-components';
import profile1 from '../assets/images/profile1.svg';
import profile2 from '../assets/images/profile2.svg';
import profile3 from '../assets/images/profile3.svg';

// 왕관 이미지들
import profile1_G from '../assets/images/profile1_G.svg';
import profile1_S from '../assets/images/profile1_S.svg';
import profile1_B from '../assets/images/profile1_B.svg';
import profile2_G from '../assets/images/profile2_G.svg';
import profile2_S from '../assets/images/profile2_S.svg';
import profile2_B from '../assets/images/profile2_B.svg';
import profile3_G from '../assets/images/profile3_G.svg';
import profile3_S from '../assets/images/profile3_S.svg';
import profile3_B from '../assets/images/profile3_B.svg';

const CardContainer = styled.div`
  width: 100%;
  height: 77px;
  background-color: ${props => props.isTopThree ? '#ffffff' : 'transparent'};
  border: ${props => props.isCurrentUser ? '1px solid var(--ewha-green)' : 'none'};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProfileImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: ${props => props.isTopThree ? '50px' : '35px'};
  height: ${props => props.isTopThree ? '50px' : '35px'};
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RankText = styled.div`
  color: var(--ewha-green);
  font-size: 12px;
  font-weight: 600;
`;

const UserName = styled.div`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
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

const RankingCard = ({ rank, user, score, totalQuestions = 10, duration, isCurrentUser = false }) => {
  // 프로필 이미지 배열
  const profileImages = [profile1, profile2, profile3];
  
  // 왕관 이미지 매핑
  const crownImages = {
    profile1: { G: profile1_G, S: profile1_S, B: profile1_B },
    profile2: { G: profile2_G, S: profile2_S, B: profile2_B },
    profile3: { G: profile3_G, S: profile3_S, B: profile3_B }
  };

  // 사용자 ID 기반으로 프로필 이미지 선택
  const getProfileImage = (userId) => {
    if (!userId) return profile1;
    return profileImages[userId % profileImages.length];
  };

  // 1-3위인 경우 왕관 이미지 선택
  const getCrownImage = (rank, userId) => {
    if (rank > 3) return null;
    
    const baseProfile = getProfileImage(userId);
    const profileKey = baseProfile === profile1 ? 'profile1' : 
                      baseProfile === profile2 ? 'profile2' : 'profile3';
    
    if (rank === 1) return crownImages[profileKey].G;
    if (rank === 2) return crownImages[profileKey].S;
    if (rank === 3) return crownImages[profileKey].B;
    return null;
  };

  const profileImage = getProfileImage(user?.id);
  const crownImage = getCrownImage(rank, user?.id);
  const isTopThree = rank <= 3;

  // 시간 포맷팅 (초를 MM분 SS초 형식으로)
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}분 ${secs.toString().padStart(2, '0')}초`;
  };

  return (
    <CardContainer isTopThree={isTopThree} isCurrentUser={isCurrentUser}>
      <LeftSection>
        <ProfileImageWrapper>
          <ProfileImage
            src={crownImage || profileImage}
            alt="프로필 이미지"
            isTopThree={isTopThree}
          />
        </ProfileImageWrapper>
        <TextContainer>
          <RankText>{rank}위</RankText>
          <UserName>{user?.nickname || '사용자'}</UserName>
        </TextContainer>
      </LeftSection>

      <RightSection>
        <Score>{score}/{totalQuestions}</Score>
        <Duration>{formatDuration(duration)}</Duration>
      </RightSection>
    </CardContainer>
  );
};

export default RankingCard;
