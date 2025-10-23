import styled from 'styled-components';
import { useState, useEffect } from 'react';
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
  opacity: ${props => props.loaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
  
  @media (min-width: 768px) {
    max-width: 600px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
  }
`;

const LoadingPlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
  
  @media (min-width: 768px) {
    max-width: 600px;
    height: 150px;
  }
  
  @media (min-width: 1024px) {
    max-width: 800px;
    height: 200px;
  }
`;

const Banner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleBannerClick = () => {
    window.open('https://ewhadam-padlet.com/', '_blank');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // 이미지 preload
  useEffect(() => {
    const img = new Image();
    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    img.src = bannerImage;
  }, []);

  return (
    <BannerContainer>
      <BannerLink onClick={handleBannerClick}>
        {!imageLoaded && !imageError && (
          <LoadingPlaceholder>
            배너 로딩 중...
          </LoadingPlaceholder>
        )}
        {imageError && (
          <LoadingPlaceholder>
            배너를 불러올 수 없습니다
          </LoadingPlaceholder>
        )}
        <BannerImage 
          src={bannerImage} 
          alt="11월 행사 배너"
          loaded={imageLoaded}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </BannerLink>
    </BannerContainer>
  );
};

export default Banner;
