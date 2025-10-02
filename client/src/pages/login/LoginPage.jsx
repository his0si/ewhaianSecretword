import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import eyeOpen from "../../assets/eyeOpen.png";
import eyeClosed from "../../assets/eyeClosed.png";
import checkGray from "../../assets/checkGray.png";
import checkGreen from "../../assets/checkGreen.png";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;   /* 스크롤 방지 */
  }
`;

// 전체 화면 배경 (항상 100%)
const Wrapper = styled.div`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background: #EFF4F2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 카드 컨테이너 (모바일은 꽉, 데스크탑은 500px 카드)
const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: #EFF4F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 38.83px;
  height: 39px;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 25px;
  line-height: 32px;
  letter-spacing: -0.02em;
  text-align: center;
  color: #0C7C51;
  margin-top: 0;
  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 14px;
  padding-left: 16px;
  padding-right: 40px;
  border: none;
  font-size: 13px;
  background: #FFFFFF;
  color: #000;

  &::placeholder {
    color: #D8D8D8;
    font-size: 13px;
  }

  &::-ms-reveal,
  &::-webkit-password-reveal-button {
    display: none;
  }
`;

const EyeIcon = styled.img`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const RememberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  font-size: 13px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#0C7C51" : "#555")};
  margin-bottom: 10px;
`;

const RememberIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  background: ${(props) => (props.disabled ? "#C8C8C8" : "#0C7C51")};
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background: ${(props) => (props.disabled ? "#C8C8C8" : "#09663f")};
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px;
  margin-top: 10px;
  background: #d6e5df;
  color: #0c7c51;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #c5d9d1;
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginButtonActive, setIsLoginButtonActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    setIsLoginButtonActive(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoginButtonActive) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    console.log("로그인 데이터:", { email, password, remember });
    // navigate("/main");
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Logo src="/ewhaianLogo.png" alt="로고" />
          <Title>
            이화이언
            <br />
            비밀단어 퀴즈
          </Title>

          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>

            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <EyeIcon
                src={showPassword ? eyeOpen : eyeClosed}
                alt="비밀번호 표시"
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputWrapper>

            <RememberWrapper
              active={remember}
              onClick={() => setRemember(!remember)}
            >
              <RememberIcon src={remember ? checkGreen : checkGray} alt="체크" />
              <span>로그인 유지</span>
            </RememberWrapper>

            <LoginButton type="submit" disabled={!isLoginButtonActive}>
              로그인
            </LoginButton>

            <RegisterButton type="button" onClick={() => navigate("/register")}>
              회원가입
            </RegisterButton>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
}
