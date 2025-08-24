import styled from "styled-components";
import bigPlus from "../assets/images/bigplus.png";

export const Page = styled.div`
  position: relative;
  width: 1440px;
  min-height: 1024px;
  margin: 0 auto;
  background: #ffffff;
  padding-bottom: 1rem;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;
`;

export const Hero = styled.div`
  position: relative;
  width: 90rem;
  height: 13.5rem;
  margin: 0 auto;
  background: #f2f6fb;
`;

export const HeroInner = styled.div`
  position: relative;
  width: 76.375rem;
  height: 100%;
  margin: 0 auto;
`;

export const HeroTitle = styled.h1`
  position: absolute;
  top: 5.75rem;
  left: 0;
  margin: 0;
  font-weight: 700;
  font-size: 3.5rem;
  letter-spacing: -0.015em;
  display: flex;
  align-items: center;
  color: #272727;
`;

export const CartWidget = styled.button`
  position: absolute;
  top: 3.75rem;
  left: 55.4375rem;
  width: 228px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #FFF;
  box-shadow: 3px 7px 10px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const CartText = styled.div`
  color: #272727;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.036rem;
  white-space: nowrap;
`;

export const CartTextWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

/* ✅ 프로필 이미지: CartWidget 오른쪽에 배치 (요청 사이즈 56.3x64.5) */
export const ProfileImage = styled.img`
  position: absolute;
  /* CartWidget: left 55.4375rem, width 228px → 오른쪽 + 2.5rem 간격 */
  left: calc(55.4375rem + 228px + 2.5rem);
  /* CartWidget: top 3.75rem, height 110px → 이미지(64.5px) 수직 중앙 정렬 */
  top: calc(3.75rem + (110px - 64.5px) / 2);
  object-fit: contain;
  cursor: pointer;
  display: flex;
  width: 90px;
  height: 90px;
  padding: 12.75px 16.875px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

/* Sections */
export const Section = styled.section`
  position: relative;
  width: 1220px;
  margin: 40px auto;
`;

export const SectionTitle = styled.h3`
  position: relative;
  display: inline-flex;          /* 아이콘을 옆에 두기 위해 inline-flex */
  align-items: center;
  gap: 8px;
  margin: 0 0 1.87rem 0;
  padding-left: 34px;
  font-size: 48px;
  line-height: 57px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #272727;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 10px;
    height: 42px;
    border-radius: 2px;
    background: #223770;
  }
`;

/* 섹션 제목 옆 연필 아이콘 */
export const EditIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
`;

export const ProductRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 카드 2개 + +타일 1개 */
  gap: 38px;
  align-items: center;
`;

export const PlusIcon = styled.img.attrs({
  src: bigPlus,
  alt: "추가",
})`
  width: 48px;   /* 아이콘 크기 원하는 대로 조절 */
  height: 48px;
  object-fit: contain;
  width: 104px;
  height: 104px;
  border-radius: 16px;
  display: flex;
  align-items: center;   /* 세로 가운데 */
  justify-content: center; /* 가로 가운데 */
  line-height: 0;        /* 아이콘이 줄간격에 밀리지 않도록 */
  cursor: pointer;
  padding: 0; /* 안쪽 여백 제거 */
`;

/* 하단 '메뉴 구분 추가하기' 버튼 */
export const FooterCta = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 590px;
  height: 110px;
  margin: 32px auto 64px;
  border: 0;
  border-radius: 30px;
  background: #223770;
  color: #fff;
  font-weight: 600;
  font-size: 36px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(34, 55, 112, 0.22);
`;

export const SmallPlus = styled.span`
  position: relative;
  width: 48px;
  height: 48px;
  display: inline-block;
  &::before, &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    background: #fff;
    transform: translate(-50%, -50%);
  }
  &::before { width: 30px; height: 2px; }
  &::after  { width: 2px;  height: 30px; }
`;