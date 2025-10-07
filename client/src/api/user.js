import api from '../lib/api';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

export async function getCurrentUser() {
  try {
    const res = await api.get(`${API_URL}/me`);
    return { ok: true, data: res.data };
  } catch (err) {
    console.error('사용자 정보 조회 API 에러:', err);
    return {
      ok: false,
      message: err.response?.data?.message || '사용자 정보를 불러오는데 실패했습니다.',
      status: err.response?.status,
    };
  }
}

export async function getUserRecords() {
  try {
    const res = await api.get(`${API_URL}/records`);
    return { ok: true, data: res.data };
  } catch (err) {
    console.error('사용자 기록 조회 API 에러:', err);
    return {
      ok: false,
      message: err.response?.data?.message || '사용자 기록을 불러오는데 실패했습니다.',
      status: err.response?.status,
    };
  }
}

export function logout() {
  localStorage.removeItem('ewhaian_token');
  sessionStorage.removeItem('ewhaian_token');
}

export function getToken() {
  return localStorage.getItem('ewhaian_token') || sessionStorage.getItem('ewhaian_token');
}
