import styled from 'styled-components';
import bannerImage from '../assets/images/banner.png';

const BannerContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 100%;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <BannerImage 
        src={bannerImage} 
        alt="11월 행사 배너"
      />
    </BannerContainer>
  );
};

export default Banner;
