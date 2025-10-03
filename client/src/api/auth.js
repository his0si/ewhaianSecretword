// client/src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/users";  // 백엔드 주소

// 로그인
export async function login({ email, password }) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });

    // JWT 토큰 저장 (자동 로그인 유지용)
    if (res.data?.token) {
      localStorage.setItem("ewhaian_token", res.data.token);
    }

    return { ok: true, data: res.data };
  } catch (err) {
    console.error("로그인 API 에러:", err);

    return {
      ok: false,
      message: err?.response?.data?.message || "로그인 중 오류가 발생했습니다.",
    };
  }
}
export async function register({ email, password, nickname, secretWord }) {
  try {
    // 백엔드의 /api/users/register 경로로 POST 요청
    const res = await axios.post(`${API_URL}/register`, {
      email,
      password,
      nickname,
      secretWord,
    });

    // 성공 시, 성공 메시지를 담은 객체 반환
    return { ok: true, data: res.data };
  } catch (err) {
    // 실패 시, 백엔드가 보낸 에러 메시지를 담은 객체 반환
    console.error("회원가입 API 에러:", err);
    return {
      ok: false,
      message: err.response?.data?.message || "회원가입 중 오류가 발생했습니다.",
    };
  }
}
