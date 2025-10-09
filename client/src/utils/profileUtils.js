/**
 * 프로필 관련 유틸리티 함수들
 */

import profile1 from '../assets/images/profile1.svg';
import profile2 from '../assets/images/profile2.svg';
import profile3 from '../assets/images/profile3.svg';

export const profileImages = [profile1, profile2, profile3];

/**
 * 사용자 ID를 기반으로 프로필 이미지를 반환
 * @param {number} userId - 사용자 ID
 * @returns {string} 프로필 이미지 경로
 */
export const getProfileImage = (userId) => {
  if (!userId) return profile1;
  return profileImages[userId % profileImages.length];
};
