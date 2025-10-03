import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e0e0e0;
  z-index: 1000;
`;

const HeaderTitle = styled.h1`
  color: var(--ewha-green);
  font-size: 16px;
  font-weight: 700;
  margin: 0;
  text-align: center;
`;

/**
 * 페이지 헤더 컴포넌트
 * - 모든 페이지에서 공통으로 사용
 * @param {string} title - 헤더에 표시할 제목
 */
const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;
