import styled from 'styled-components';

const Overlay = styled.div`
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

const PopupContainer = styled.div`
  width: 270px;
  height: 124px;
  background-color: white;
  border-radius: 22px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  font-size: 14px;
  color: #000000;
  text-align: center;
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5;
  white-space: pre-line;
  word-break: keep-all;
`;

const SeparatorLine = styled.div`
  height: 1px;
  background-color: #E5E5E5;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 48px;
`;

const Button = styled.button`
  flex: 1;
  background-color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ewha-green);
  border-radius: 0 0 22px 22px;

  &:hover {
    background-color: #F5F5F5;
  }
`;

const AlertPopup = ({
  isOpen,
  message,
  onConfirm,
  confirmText = "확인"
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <PopupContainer>
        <Message>{message}</Message>
        <SeparatorLine />
        <ButtonContainer>
          <Button onClick={onConfirm}>
            {confirmText}
          </Button>
        </ButtonContainer>
      </PopupContainer>
    </Overlay>
  );
};

export default AlertPopup;

