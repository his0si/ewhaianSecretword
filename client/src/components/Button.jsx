import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: var(--ewha-green);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  width: 280px;
  height: 48px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:focus {
    outline: none;
  }
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
  }
  
  &:active:not(:disabled) {
    transform: scale(1.02);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

/**
 * 범용 버튼 컴포넌트
 * - 초록색 배경의 둥근 버튼
 * - 호버 시 확대 애니메이션
 * - 클릭 시 축소 애니메이션
 * - 다양한 텍스트와 용도로 사용 가능
 * 
 * @param {string} children - 버튼에 표시할 텍스트 (기본값: "버튼")
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {boolean} disabled - 버튼 비활성화 여부
 * @param {string} type - 버튼 타입 (button, submit, reset)
 * @param {object} props - 추가 props
 */
const Button = ({ 
  children = "버튼", 
  onClick, 
  disabled = false,
  type = "button",
  ...props 
}) => {
  return (
    <StyledButton 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
