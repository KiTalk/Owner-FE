import styled from "styled-components";

const NAVY = "#223770";

/* 오버레이 & 다이얼로그 */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const Dialog = styled.div`
  width: 860px;                       /* 스샷과 유사한 폭 */
  max-width: calc(100vw - 40px);
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0,0,0,0.25);
  overflow: hidden;
`;

/* 헤더 */
export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 22px 26px 8px;
  border-bottom: 1px solid #eef1f5;
`;

export const HeaderBar = styled.span`
  display: inline-block;
  width: 12px;
  height: 30px;
  border-radius: 3px;
  background: ${NAVY};
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: #272727;
`;

/* 본문 레이아웃: 좌 이미지 / 우 필드 */
export const Body = styled.div`
  padding: 20px 26px 10px;
  display: grid;
  grid-template-columns: 210px 1fr;   /* 왼쪽 썸네일 폭 */
  column-gap: 28px;
  row-gap: 8px;
`;

export const LeftCol = styled.div`
  display: grid;
  align-content: start;
  gap: 10px;
`;

export const Thumb = styled.div`
  position: relative;                 /* ✅ 오버레이 버튼을 위해 */
  width: 180px;
  height: 180px;
  border-radius: 16px;
  background: #f2f6fb;
  border: 1.5px solid #d9e0ea;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
`;

export const ThumbEditButton = styled.button`
  /* 전역 버튼 스타일 상속 차단 */
  all: unset;

  position: absolute;
  right: 8px;
  top: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;                 /* ✅ 흰 배경 고정 */
  border: 1px solid #d7dbe4;        /* ✅ 연한 테두리 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  cursor: pointer;

  &:hover { background: #f8fafc; }
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(34,55,112,0.18); }

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    /* ⬇️ 아이콘 PNG가 파란색이라면 무채색으로 보이게 함. 원색 유지하려면 이 두 줄 제거 */
    filter: grayscale(1) brightness(0) invert(0);
    opacity: .9;
  }
`;

/* ✅ 파일 업로드 input (숨김) */
export const HiddenFile = styled.input.attrs({ type: "file", accept: "image/*" })`
  display: none;
`;

/* 우측 폼 그리드 */
export const Fields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;     /* 이름은 2칸, 가격/색상은 좌우 */
  column-gap: 26px;
  row-gap: 16px;

  .field-name     { grid-column: 1 / span 2; }
  .field-price    { grid-column: 1 / span 1; }
  .field-color    { grid-column: 2 / span 1; }
  .field-tags     { grid-column: 1 / span 2; }
  .field-options  { grid-column: 1 / span 2; }

  /* (선택) 태그/옵션 위치 조정이 필요하면 여기 margin 조절 */
  /* .field-tags, .field-options { margin-left:-230px; margin-top:8px; } */
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #6b7280;
`;

export const Input = styled.input`
  height: 48px;
  border: 1.5px solid #cfd6e3;
  border-radius: 12px;
  padding: 0 14px;
  font-size: 16px;
  outline: none;
  background: #fff;

  &:focus { border-color: ${NAVY}; box-shadow: 0 0 0 3px rgba(34,55,112,0.12); }

  /* 가격 입력은 크게 굵게 */
  &.price {
    width: 210px;
    font-size: 28px;
    font-weight: 800;
    color: ${NAVY};
  }
`;

export const InputRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  align-items: center;
`;

export const UnitBadge = styled.div`
  height: 48px;
  min-width: 64px;
  border: 1.5px solid #e0e5ee;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${NAVY};
  font-weight: 800;
  background: #fff;
`;

/* 색상 주문 표시: Select 좌측에 색 점만 */
export const SelectWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
`;

export const ColorDot = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#7bd35f"};
  pointer-events: none;
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;
  border: 1.5px solid #cfd6e3;
  border-radius: 12px;
  padding: 0 14px 0 38px;             /* ← 도트 공간 확보 */
  font-size: 16px;
  outline: none;
  appearance: auto;
  background: #fff;
  color: #334155;

  &:focus { border-color: ${NAVY}; box-shadow: 0 0 0 3px rgba(34,55,112,0.12); }
`;

/* 칩 */
export const ChipRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Chip = styled.button`
  height: 44px;
  padding: 0 18px;
  border-radius: 999px;
  border: 1.5px solid ${({$active}) => ($active ? NAVY : "#d9dfe8")};
  background: ${({$active}) => ($active ? NAVY : "#fff")};
  color: ${({$active}) => ($active ? "#fff" : "#334155")};
  font-weight: 800;
  cursor: pointer;

  &.ghost { background: #f3f6fb; border-color: #e2e8f0; color:#6b7280; }
`;

/* 푸터 버튼 */
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  padding: 18px 26px 24px;
  border-top: 1px solid #eef1f5;
`;

export const Secondary = styled.button`
  min-width: 120px;
  height: 56px;
  border-radius: 16px;
  border: 2px solid ${NAVY};
  background: #fff;
  color: ${NAVY};
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
`;

export const Primary = styled.button`
  min-width: 140px;
  height: 56px;
  border-radius: 16px;
  border: 0;
  background: ${NAVY};
  color: #fff;
  font-weight: 900;
  font-size: 18px;
  cursor: pointer;
  &:hover { box-shadow: 0 8px 18px rgba(34,55,112,0.22); background: #1f336a; }
`;
