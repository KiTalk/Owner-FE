import styled from "styled-components";

/** 화면 규격 고정 (1440 x 1024) */
export const Page = styled.div`
  width: 1440px;
  height: 1024px;
  margin: 0 auto;
  background: #f3f7fb;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

/** 상단 바 + 탭 */
export const Header = styled.header`
  height: 150px;
  background: #223770;
  display: flex;
  align-items: center;
  justify-content: space-between; /* 좌우 끝 + 가운데 */
  padding: 0 24px;
  margin-bottom: 10px;
`;

export const HeaderIcon = styled.img`
  width: 47px;
  height: 49px;
  flex-shrink: 0;
  object-fit: contain;
  cursor: pointer;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
`;

export const HeaderCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

/** 우측 아이콘 */
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 80px;
`;

export const Tabs = styled.div`
  color: #cfe0ff;
  font-weight: 600;
  font-size: 2rem;
  display: flex;
  align-items: center;
  gap: 12px;

  .divider {
    opacity: 0.6;
  }
`;

export const Tab = styled.button`
  border: 0;
  background: ${({ $active }) => ($active ? "#fff" : "transparent")};
  color: ${({ $active }) => ($active ? "#183a6a" : "#fff")};
  padding: 8px 16px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.15s ease;
  outline: none;

  &:hover {
    filter: brightness(0.95);
  }
`;

/** 카드 그리드 */
export const Grid = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;  /* ✅ 카드들을 가운데 정렬 */
`;

export const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e6eef7;
  border-radius: 12px;
  padding: 16px 18px 18px;
  box-shadow: 0 4px 12px rgba(24, 58, 106, 0.06);
  display: flex;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const OrderNo = styled.span`
  font-weight: 700;
  color: #6b7b93;
`;

export const PackType = styled.span`
  margin-left: 6px;
  padding-left: 8px;
  border-left: 1px solid #d8e2f0;
  color: #223770;
  font-weight: 700;
`;

/** 아이템 목록 */
export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 132px;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: #394b6a;
  font-size: 14px;
`;

/** 금액 / 버튼 */
export const Price = styled.div`
  margin-top: 8px;
  margin-bottom: 12px;
  text-align: right;
  font-weight: 800;
  color: #223770;
  font-size: 20px;
`;

export const CTAButton = styled.button`
  align-self: center;
  width: 220px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: #223770;
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.04s ease, opacity 0.2s ease;

  &:active {
    transform: translateY(1px);
  }
`;

/** 빈 상태 & 로딩 텍스트 */
export const EmptyState = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  color: #5e6f90;
  font-weight: 600;
`;

/** 로고 영역: 상단 중앙 */
export const LogoContainer = styled.div`
  position: fixed;
  bottom: 20px;          /* 화면 하단에서 20px */
  left: 50%;
  transform: translateX(-50%); /* 중앙 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;          /* 다른 요소 위에 노출 */
`;

export const LogoImage = styled.img`
  width: 203.001px;
  height: 42.75px;
  object-fit: contain;
`;
