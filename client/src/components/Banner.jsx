import styled from 'styled-components';

const BannerContainer = styled.div`
  width: 100%;
  height: 100px;
  background-color: #d3d3d3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const BannerText = styled.div`
  color: #666666;
  font-size: 16px;
  font-weight: 400;
`;

const Banner = () => {
  return (
    <BannerContainer>
      <BannerText>11월 행사 배너 자리</BannerText>
    </BannerContainer>
  );
};

export default Banner;
