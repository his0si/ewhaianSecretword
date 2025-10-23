import styled from 'styled-components';
import bannerImage from '../assets/images/banner.png';

const BannerContainer = styled.div`
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-top: -20px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  
  @media (min-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const BannerLink = styled.a`
  width: 100%;
  display: block;
  cursor: pointer;
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
  const handleBannerClick = () => {
    window.open('https://ewhadam-padlet.com/', '_blank');
  };

  return (
    <BannerContainer>
      <BannerLink onClick={handleBannerClick}>
        <BannerImage 
          src={bannerImage} 
          alt="11월 행사 배너"
        />
      </BannerLink>
    </BannerContainer>
  );
};

export default Banner;
