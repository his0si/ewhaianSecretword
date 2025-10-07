import api from '../lib/api';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/leaderboard`;

export async function getLeaderboard() {
  try {
    const res = await api.get(API_URL);
    return { ok: true, data: res.data };
  } catch (err) {
    console.error('리더보드 조회 API 에러:', err);
    return {
      ok: false,
      message: err.response?.data?.message || '리더보드를 불러오는데 실패했습니다.',
    };
  }
}
