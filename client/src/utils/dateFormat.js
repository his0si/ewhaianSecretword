/**
 * 날짜 포맷팅 함수들
 */

// 날짜를 "M월 D일 HH:MM" 형식으로 변환
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${month}월 ${day}일 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// formatDuration은 timeFormat.js로 이동했으므로 재export
export { formatDuration } from './timeFormat';
