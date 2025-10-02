import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f7f4;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #064420;
`;

const Form = styled.form`
  width: 80%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: 14px;
  &:focus {
    outline: none;
    border: 1px solid #0a6847;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px 0 16px 4px;
  font-size: 13px;
  color: #555;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 25px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  margin-top: ${(props) => (props.secondary ? "0" : "4px")};

  background-color: ${(props) => (props.secondary ? "#e6e6e6" : "#0a6847")};
  color: ${(props) => (props.secondary ? "#333" : "white")};

  &:hover {
    background-color: ${(props) => (props.secondary ? "#dcdcdc" : "#095c3f")};
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("로그인 데이터:", { email, password, remember });
    // TODO: API 연동
  };

  return (
    <Container>
      {/* 로고 (public 폴더의 ewhainLogo.png 사용 예시) */}
      <Logo src="/ewhainLogo.png" alt="이화이언 로고" />
      <Title>이화이언 비밀단어 퀴즈</Title>

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="이메일 주소"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <CheckboxWrapper>
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <span>로그인 유지</span>
        </CheckboxWrapper>

        <Button type="submit">로그인</Button>
        <Button type="button" secondary onClick={() => navigate("/register")}>
          회원가입
        </Button>
      </Form>
    </Container>
  );
}
