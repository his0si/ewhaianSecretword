import styled from 'styled-components';
import { useState } from 'react';

const AnswerContainer = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const AnswerLabel = styled.label`
  display: none;
`;

const AnswerInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 16px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: white;
  
  &:focus {
    border-color: var(--ewha-green);
  }
  
  &::placeholder {
    color: #B0B0B0;
  }
`;

/**
 * 답안 입력 컴포넌트
 * @param {string} value - 현재 입력된 답안
 * @param {function} onChange - 답안 변경 핸들러
 * @param {function} onEnter - Enter 키 입력 시 호출되는 핸들러
 * @param {string} placeholder - 플레이스홀더 텍스트
 */
const AnswerInputComponent = ({
  value = '',
  onChange,
  onEnter,
  placeholder = "답을 입력하세요"
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
  };

  return (
    <AnswerContainer>
      <AnswerLabel>답안 입력</AnswerLabel>
      <AnswerInput
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
      />
    </AnswerContainer>
  );
};

export default AnswerInputComponent;
