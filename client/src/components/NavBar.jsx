import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import rankingIcon from '../assets/images/ranking.svg';
import rankingIconGreen from '../assets/images/ranking_G.svg';
import keyIcon from '../assets/images/key.svg';
import keyIconGreen from '../assets/images/key_G.svg';
import profileIcon from '../assets/images/profile.svg';
import profileIconGreen from '../assets/images/profile_G.svg';

const NavBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px 0;
  z-index: 1000;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-width: 60px;

  &:hover {
    background-color: rgba(12, 124, 81, 0.1);
  }
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
`;

const NavLabel = styled.span`
  font-size: 10px;
  font-weight: 500;
  transition: color 0.2s ease;
  color: ${props => props.$isActive ? 'var(--ewha-green)' : '#B0B0B0'};
`;

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'ranking',
      label: '랭킹',
      path: '/ranking',
      icon: rankingIcon,
      iconGreen: rankingIconGreen
    },
    {
      id: 'quiz',
      label: '퀴즈',
      path: '/quiz',
      icon: keyIcon,
      iconGreen: keyIconGreen
    },
    {
      id: 'myrecord',
      label: '내 기록',
      path: '/myrecord',
      icon: profileIcon,
      iconGreen: profileIconGreen
    }
  ];

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <NavBarContainer>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavItem
            key={item.id}
            onClick={() => handleNavClick(item.path)}
          >
            <NavIcon
              src={isActive ? item.iconGreen : item.icon}
              alt={item.label}
            />
            <NavLabel $isActive={isActive}>
              {item.label}
            </NavLabel>
          </NavItem>
        );
      })}
    </NavBarContainer>
  );
};

export default NavBar;