import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

export async function login({ email, password, remember = false }) {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if(res.data?.token){
      if(remember){
        localStorage.setItem("ewhaian_token",res.data.token);
      }else{
        sessionStorage.setItem("ewhaian_token",res.data.token);
      }
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
    const res = await axios.post(`${API_URL}/register`, {
      email,
      password,
      nickname,
      secretWord,
    });

    return { ok: true, data: res.data };
  } catch (err) {
    console.error("회원가입 API 에러:", err);
    return {
      ok: false,
      message: err.response?.data?.message || "회원가입 중 오류가 발생했습니다.",
    };
  }
}
