import styled from 'styled-components';

// 페이지 전체를 감싸는 래퍼 (중앙 정렬 및 반응형 지원)
export const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #EFF4F2;
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

// 콘텐츠를 담는 컨테이너 (헤더와 네비게이션 바 공간 확보)
export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  padding-top: ${props => props.$noPaddingTop ? '0' : '52px'};
  padding-bottom: ${props => props.$noPaddingBottom ? '0' : '56px'};
  background-color: #EFF4F2;
  box-sizing: border-box;
  ${props => props.$noOverflow ? '' : 'overflow-y: auto;'}

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

// 컨테이너 내부 콘텐츠 영역
export const Content = styled.div`
  padding: ${props => props.$noPadding ? '0' : '20px'};
  ${props => props.$flexCenter ? `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: ${props.$justifyContent || 'flex-start'};
  ` : ''}
  ${props => props.$minHeight ? `
    min-height: calc(calc(var(--vh, 1vh) * 100) - 52px - 56px);
  ` : ''}
  box-sizing: border-box;
`;

// 로고 섹션
export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${props => props.$marginBottom || '20px'};
`;

// 로고 이미지
export const Logo = styled.img`
  width: ${props => props.$size || '48px'};
  height: ${props => props.$size || '48px'};
  margin-bottom: ${props => props.$marginBottom || '16px'};
`;

// 카드 스타일 컨테이너
export const Card = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: ${props => props.$padding || '24px'};
  width: 100%;
  margin-bottom: ${props => props.$marginBottom || '24px'};
  box-sizing: border-box;
`;

// 버튼 섹션 (세로로 버튼들 배치)
export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$gap || '12px'};
  width: 100%;
  max-width: ${props => props.$maxWidth || '280px'};
  ${props => props.$marginTop ? `margin-top: ${props.$marginTop};` : ''}
`;

// 팝업 오버레이
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 팝업 컨텐츠
export const PopupContent = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: ${props => props.$padding || '32px 24px'};
  width: ${props => props.$width || '280px'};
  max-width: 90%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.$gap || '24px'};
`;

// 로딩 텍스트
export const LoadingText = styled.div`
  color: var(--ewha-green);
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;

// 에러 텍스트
export const ErrorText = styled.div`
  color: #d32f2f;
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
`;

// 정보 섹션 (텍스트 중앙 정렬)
export const InfoSection = styled.div`
  text-align: center;
  margin-bottom: ${props => props.$marginBottom || '32px'};
  max-width: ${props => props.$maxWidth || '320px'};
`;

// 정보 타이틀
export const InfoTitle = styled.div`
  color: var(--ewha-green);
  font-size: ${props => props.$fontSize || '13px'};
  font-weight: 600;
  margin-bottom: ${props => props.$marginBottom || '12px'};
`;

// 정보 텍스트
export const InfoText = styled.div`
  color: #5E5E5E;
  font-size: ${props => props.$fontSize || '13px'};
  line-height: ${props => props.$lineHeight || '1.6'};
  margin-bottom: ${props => props.$marginBottom || '8px'};
`;
