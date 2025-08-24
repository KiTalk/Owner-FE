import styled from "styled-components";

/** 카드 전체 박스 */
export const Card = styled.div`
  width: 381px;
  height: 514px;
  background: #ffffff;
  border: 1px solid #e6eef7;
  border-radius: 12px;
  padding: 30px 30px;
  box-shadow: 0 4px 12px rgba(24, 58, 106, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

/** 상단 영역: 주문번호 / 포장 여부 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;

export const OrderNo = styled.span`
    color: #878787;
    font-family: Pretendard;
    font-size: 26.816px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.402px;
`;

export const PackType = styled.span`
    color: #223770;
    font-family: Pretendard;
    font-size: 26.816px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.402px;
`;

/** 아이템 리스트 */
export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;              /* 본문 영역이 남는 공간 채우도록 */
  min-height: 132px;
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  color: #394b6a;
  font-size: 1.5rem;

  span:first-child {
    flex: 1;          /* 왼쪽 이름은 넓게 */
    text-align: left;
  }

  span:last-child {
    min-width: 24px;  /* 수량은 고정 폭 */
    text-align: right;
  }
`;

export const BottomArea = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Divider = styled.div`
  width: 80%;                /* 카드 너비의 80% 정도 */
  height: 2px;
  background-color: #878787; /* 선 색상 */
  margin: 16px auto;         /* auto → 가로 가운데 정렬 */
`;


export const Price = styled.div`
  width: 100%;
  text-align: right;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  color: #173561;
  margin-bottom: 12px;
`;

export const CTAButton = styled.button`
    width: 332px;
    height: 80px;
    flex-shrink: 0;
    color: #FFF;
    text-align: center;
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  border-radius: 10px;
  border: none;
  background: #173561;
  cursor: pointer;
  transition: transform 0.04s ease, opacity 0.2s ease;

  &:active {
    transform: translateY(1px);
  }
`;