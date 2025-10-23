import styled from 'styled-components';
import bannerImage from '../assets/images/banner.png';

const BannerContainer = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  
  @media (min-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 100%;
  
  @media (min-width: 768px) {
    max-width: 600px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
  }
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
