import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ffb3ba;
`;

const UserName = styled.h2`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const ProfileSection = ({ profileImage, userName }) => {
  return (
    <Container>
      <ProfileImage src={profileImage} alt="프로필 이미지" />
      <UserName>{userName}</UserName>
    </Container>
  );
};

export default ProfileSection;
