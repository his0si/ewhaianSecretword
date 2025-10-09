/**
 * 시간 포맷팅 함수들
 */

// 초를 MM:SS 형식으로 변환 (타이머용)
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 초를 MM분 SS초 형식으로 변환 (결과 표시용)
export const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}분 ${secs.toString().padStart(2, '0')}초`;
};

// formatResultTime은 formatDuration과 동일 (하위 호환성을 위해 유지)
export const formatResultTime = formatDuration;
