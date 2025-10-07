import api from '../lib/api';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/quiz`;

export async function getQuestions() {
  try {
    const res = await api.get(`${API_URL}/questions`);
    return { ok: true, data: res.data };
  } catch (err) {
    console.error('퀴즈 문제 조회 API 에러:', err);
    return {
      ok: false,
      message: err.response?.data?.message || '퀴즈 문제를 불러오는데 실패했습니다.',
    };
  }
}

export async function getTotalQuestions() {
  try {
    const res = await api.get(`${API_URL}/total`);
    return { ok: true, data: res.data.total };
  } catch (err) {
    console.error('총 문제 수 조회 API 에러:', err);
    return {
      ok: false,
      message: err.response?.data?.message || '총 문제 수를 불러오는데 실패했습니다.',
    };
  }
}

export async function submitQuiz({ answers, duration }) {
  try {
    const res = await api.post(`${API_URL}/submit`, {
      answers,
      duration,
    });
    return { ok: true, data: res.data };
  } catch (err) {
    console.error('퀴즈 제출 API 에러:', err);
    return {
      ok: false,
      message: err.response?.data?.message || '퀴즈 제출에 실패했습니다.',
      status: err.response?.status,
    };
  }
}
