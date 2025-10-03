import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import eyeOpen from "../../assets/eyeOpen.png";
import eyeClosed from "../../assets/eyeClosed.png";
import backArrow from "../../assets/backArrow.png";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";   

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #EFF4F2;   /* ✨ 전체 배경색 */
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: #EFF4F2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;   /* ✅ 세로 가운데 정렬 */
`;


const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
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
  padding: 0 20px 20px;
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

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 10px;
  border: none;
  padding: 0 40px 0 14px;
  font-size: 14px;
  background: #fff;

  &::placeholder {
    color: #D8D8D8;
  }
`;

const HelperText = styled.p`
  font-size: 12px;
  color: #999999;
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
`;

export default function RegisterPage() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const isFormValid =
    nickname.trim() && email.trim() && password.trim() && secret.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const result = await register({
      email,
      password,
      nickname,
      secretWord: secret,
    });

    console.log(" 서버로부터 받은 응답:", result);
    if (result.ok) {
      alert(result.data.message);   // "가입 성공! 이메일을 확인하여 계정을 활성화해주세요."
      navigate("/");                // ✅ 로그인 페이지로 이동
    } else {
      alert(result.message);        // "이미 사용 중인 이메일…" 등 서버 메시지
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Container>
          <Header>
            <BackButton src={backArrow} alt="Back" onClick={() => window.history.back()} />
            <Title>회원가입</Title>
          </Header>

          <Form onSubmit={handleSubmit}>
            <SectionTitle>정보 입력</SectionTitle>

            <InputGroup>
              <Input
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <HelperText>
                * 닉네임은 회원가입 이후 변경할 수 없습니다.
                <br />
                신중히 작성해 주세요.
              </HelperText>
            </InputGroup>

            <InputGroup>
              <Input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <HelperText>
                * 이화여자대학교 이메일 주소를 통해서만 회원가입이 가능합니다.
                <br />
                (ewhain.net 혹은 ewha.ac.kr)
              </HelperText>
            </InputGroup>

            <InputGroup>
              <InputWrapper>
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
              </InputWrapper>
            </InputGroup>

            <SectionTitle>유레카 비밀단어 인증</SectionTitle>

            <InputGroup>
              <Input
                placeholder="비밀단어"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
              <HelperText>
                * 이화인 인증을 위해 유레카 자유게시판&gt;이화이언 비번 TF 비밀단어
                <br />
                게시글의 비밀단어를 입력해 주세요.
              </HelperText>
            </InputGroup>

            <SubmitButton type="submit" disabled={!isFormValid}>
              회원가입하기
            </SubmitButton>
          </Form>
        </Container>
      </Wrapper>
    </>
  );
}
