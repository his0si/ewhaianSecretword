import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import eyeOpen from "../../assets/images/eyeOpen.png";
import eyeClosed from "../../assets/images/eyeClosed.png";
import backArrow from "../../assets/images/backArrow.png";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import axios from "axios";
import AlertPopup from "../../components/AlertPopup";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #EFF4F2;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #EFF4F2;
  overflow-y: auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  background: #EFF4F2;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: sticky;
  top: 0;
  background: #EFF4F2;
  z-index: 10;
`;

const BackButton = styled.img`
  position: absolute;
  left: 20px;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  flex: 1;
`;

const SectionTitle = styled.h2`
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #0C7C51;
  margin: 20px 0 10px;
  padding-left: 4px;
`;

const InputGroup = styled.div`
  margin-bottom: 14px;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  border: ${props => props.error ? '1px solid #e01e5a' : 'none'};
  overflow: hidden;
`;

const Input = styled.input`
  flex: 1;
  height: 44px;
  border: none;
  padding: 0 14px;
  font-size: 14px;
  background: transparent;
  outline: none;

  &::placeholder {
    color: #D8D8D8;
  }
`;

const CheckButton = styled.button`
  height: 32px;
  margin: 6px;
  padding: 0 12px;
  border-radius: 12px;
  border: none;
  background: ${props => props.checked ? '#0C7C51' : '#d6e5df'};
  color: ${props => props.checked ? '#fff' : '#0C7C51'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;
  outline: none;

  &:hover {
    background: ${props => props.checked ? '#09663f' : '#c5d9d1'};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #e0e0e0;
    color: #999;
    cursor: not-allowed;
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: ${props => props.error ? '#e01e5a' : props.success ? '#0C7C51' : '#999999'};
  margin: 6px 0 0 4px;
  line-height: 1.4;
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

const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background: ${(props) => (props.disabled ? "#C8C8C8" : "#0C7C51")};
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.2s;

  &:hover {
    background: ${(props) => (props.disabled ? "#C8C8C8" : "#09663f")};
  }
`;

const ErrorMessage = styled.p`
  color: #e01e5a;
  font-size: 13px;
  margin: 10px 0;
  text-align: center;
`;

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  // 뷰포트 높이 설정
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // 닉네임 변경 시 중복 확인 상태 초기화
  useEffect(() => {
    setNicknameChecked(false);
    setNicknameError("");
  }, [nickname]);

  // 이메일 변경 시 중복 확인 상태 초기화
  useEffect(() => {
    setEmailChecked(false);
    setEmailError("");
  }, [email]);

  const checkNickname = async () => {
    if (!nickname.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/check-nickname`, { nickname });
      if (res.data.available) {
        setNicknameChecked(true);
        setNicknameError("");
      } else {
        setNicknameChecked(false);
        setNicknameError("이미 사용 중인 닉네임입니다.");
      }
    } catch (err) {
      setNicknameError(err.response?.data?.message || "닉네임 확인 중 오류가 발생했습니다.");
      setNicknameChecked(false);
    }
  };

  const checkEmail = async () => {
    if (!email.trim()) {
      setEmailError("이메일을 입력해주세요.");
      return;
    }

    if (!email.endsWith('@ewhain.net') && !email.endsWith('@ewha.ac.kr')) {
      setEmailError("이화여자대학교 이메일만 사용 가능합니다.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/check-email`, { email });
      if (res.data.available) {
        setEmailChecked(true);
        setEmailError("");
      } else {
        setEmailChecked(false);
        setEmailError("이미 사용 중인 이메일입니다.");
      }
    } catch (err) {
      setEmailError(err.response?.data?.message || "이메일 확인 중 오류가 발생했습니다.");
      setEmailChecked(false);
    }
  };

  const isFormValid =
    nickname.trim() &&
    email.trim() &&
    password.trim() &&
    secret.trim() &&
    nicknameChecked &&
    emailChecked;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    if (!isFormValid) {
      setGeneralError("모든 필드를 입력하고 중복 확인을 완료해주세요.");
      return;
    }

    setIsSubmitting(true);
    setGeneralError("");

    const result = await register({
      email,
      password,
      nickname,
      secretWord: secret,
    });

    setIsSubmitting(false);

      if (result.ok) {
        const serverMessage = result.data.message || "";
        let displayMessage = "";

        if (serverMessage.includes("가입 성공")) {
          displayMessage = (
            <>
              <span style={{ color: 'var(--ewha-green)', fontWeight: 'bold' }}>가입 성공!</span>
              {"\n"}이메일에 있는 인증 링크를 눌러{"\n"}계정을 활성화해주세요
            </>
          );
        } else {
          displayMessage = serverMessage;
        }

        setAlertMessage(displayMessage);
        setShowAlertPopup(true);
    } else {
      setGeneralError(result.message);
    }
  };

  const handleAlertConfirm = () => {
    setShowAlertPopup(false);
    navigate("/");
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Header>
            <BackButton src={backArrow} alt="Back" onClick={() => navigate("/")} />
            <Title>회원가입</Title>
          </Header>

          <Form onSubmit={handleSubmit}>
            <SectionTitle>정보 입력</SectionTitle>

            <InputGroup>
              <InputContainer error={nicknameError && !nicknameChecked}>
                <Input
                  placeholder="닉네임"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
                <CheckButton
                  type="button"
                  onClick={checkNickname}
                  checked={nicknameChecked}
                  disabled={!nickname.trim()}
                >
                  {nicknameChecked ? "확인완료" : "중복확인"}
                </CheckButton>
              </InputContainer>
              {nicknameError && <HelperText error>{nicknameError}</HelperText>}
              {nicknameChecked && <HelperText success>사용 가능한 닉네임입니다.</HelperText>}
              <HelperText>
                * 닉네임은 회원가입 이후 변경할 수 없습니다.
                <br />
                신중히 작성해 주세요.
              </HelperText>
            </InputGroup>

            <InputGroup>
              <InputContainer error={emailError && !emailChecked}>
                <Input
                  type="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CheckButton
                  type="button"
                  onClick={checkEmail}
                  checked={emailChecked}
                  disabled={!email.trim()}
                >
                  {emailChecked ? "확인완료" : "중복확인"}
                </CheckButton>
              </InputContainer>
              {emailError && <HelperText error>{emailError}</HelperText>}
              {emailChecked && <HelperText success>사용 가능한 이메일입니다.</HelperText>}
              <HelperText>
                * 이화여자대학교 이메일 주소를 통해서만 회원가입이 가능합니다.
                <br />
                (ewhain.net 혹은 ewha.ac.kr)
              </HelperText>
            </InputGroup>

            <InputGroup>
              <InputContainer>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <EyeIcon
                  src={showPassword ? eyeOpen : eyeClosed}
                  onClick={() => setShowPassword(!showPassword)}
                  alt="Toggle Password Visibility"
                />
              </InputContainer>
            </InputGroup>

            <SectionTitle>유레카 비밀단어 인증</SectionTitle>

            <InputGroup>
              <InputContainer>
                <Input
                  placeholder="비밀단어"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                />
              </InputContainer>
              <HelperText>
                * 이화인 인증을 위해 유레카 자유게시판&gt;이화이언 비번 TF 비밀단어
                <br />
                게시글의 비밀단어를 입력해 주세요.
              </HelperText>
            </InputGroup>

            {generalError && <ErrorMessage>{generalError}</ErrorMessage>}

            <SubmitButton type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "회원가입 중..." : "회원가입하기"}
            </SubmitButton>
          </Form>
        </Container>
      </Wrapper>

      <AlertPopup
        isOpen={showAlertPopup}
        message={alertMessage}
        onConfirm={handleAlertConfirm}
      />
    </>
  );
}
