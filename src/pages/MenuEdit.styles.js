import styled from "styled-components";
import downIcon from "../assets/images/down.png";
import plusIcon from "../assets/images/plus.png";

const NAVY = "#223770";

/* 오버레이 & 다이얼로그 */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  overscroll-behavior: contain; /* 스크롤 체인 방지 */
  touch-action: none;           /* 터치 스크롤 차단 */
  pointer-events: auto;         /* 포인터 이벤트 받기 */
`;

export const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 1223px;
  height: 882px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(0,0,0,0.25);
  overflow: auto;
  padding: 20px 30px 0px;
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
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  color: #272727;
`;

/* 본문 레이아웃
   1행: [LeftCol][RightCol]
   2행: [TagOptionRow (전체폭)] */
export const Body = styled.div`
  padding: 40px 20px 0px;
  display: grid;
  /* ✅ 썸네일(275px) + 여백을 위해 좌측 칼럼 여유 확보 */
  grid-template-columns: 340px 1fr;
  grid-auto-rows: min-content;
  column-gap: 20px;   /* 좌우 간격 확대 */
  row-gap: 20px;      /* 위아래 간격 확대 */
`;

/* (좌) 대표 이미지 컬럼 */
export const LeftCol = styled.div`
  display: grid;
  align-content: start;
  gap: 16px;  /* 썸네일/라벨 간격 */
`;

export const Thumb = styled.div`
  position: relative;
  width: 275px;
  height: 275px;
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
  all: unset;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #d7dbe4;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  cursor: pointer;
  &:hover { background: #f8fafc; }
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(34,55,112,0.18); }
  img { width: 18px; height: 18px; object-fit: contain; }
`;

export const HiddenFile = styled.input.attrs({ type: "file", accept: "image/*" })`
  display: none;
`;

/* (우) RightCol: 이름 + PnCRow */
export const RightCol = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 16px;
  /* ✅ 그리드 아이템 기본 min-width:auto로 인한 넘침 방지 */
  min-width: 0;
`;

export const Label = styled.label`
  color: #878787;
  font-family: Pretendard;
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 107.143% */
  letter-spacing: -0.42px;
`;

export const Input = styled.input`
  height: 80px;
  border: 1.5px solid #cfd6e3;
  border-radius: 20px;
  padding: 0 14px;
  font-size: 40px;
  font-weight: 550;
  outline: none;
  background: #fff;
  color: #0b1b2b;
  &:focus { border-color: ${NAVY}; box-shadow: 0 0 0 3px rgba(34,55,112,0.12); }
  /* 메뉴 이름 input */
  &.name {
    width: 708px;
  }

  /* 가격 input */
  &.price {
    width: 219px;
    color: ${NAVY};
  }
`;

/* 입력 행 (가격 + 원뱃지) */
export const InputRow = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 12px;           /* 여백 소폭 확대 */
  align-items: center;
`;

export const UnitBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${NAVY};
  font-size: 40px;
 font-weight: 500;
  margin-left: 8px; /* 가격 input과 '원' 사이 여백 */
  min-width: 40px;
`;

export const ColorDot = styled.span`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${({ $color }) => $color || "#78A55A"};
  pointer-events: none;
`;

export const Select = styled.select`
  width: 100%;
  height: 80px;
  border: 1.5px solid #cfd6e3;
  border-radius: 30px;
  padding: 0 80px 0px;  /* 오른쪽 패딩을 늘려 화살표 공간 확보 */
  font-size: 35px;
  font-weight: 600;
  outline: none;
  appearance: none;       /* ✅ 기본 화살표 제거 */
  -webkit-appearance: none;
  -moz-appearance: none;
  background: #fff;
  color: #334155;

  &:focus {
    border-color: ${NAVY};
    box-shadow: 0 0 0 3px rgba(34,55,112,0.12);
  }

  /* ▼ 드롭다운 펼쳐졌을 때 옵션 글자 크기/줄간격만 크게 줄이기 */
  option {
    font-size: 20px;     /* 옵션 목록 텍스트 크기 축소 */
    line-height: 1.25;   /* 과도한 세로 높이 방지 */
    /* 일부 브라우저는 padding을 무시하지만, 가능한 곳에서는 적용됨 */
    padding: 6px 10px;
  }

  /* (선택) optgroup 레이블도 축소 */
  optgroup {
    font-size: 18px;
    font-weight: 600;
  }
`;

/* PnC: 가격 + 색상주문표시를 같은 줄 */
export const PnCRow = styled.div`
  display: grid;
  grid-template-columns: 300px minmax(200px, 1fr); /* 가격 칸을 300px 고정, 색상은 최소 200px */
  gap: 32px;  /* 좌우 간격 넉넉히 */
  align-items: center;
`;

/* 가격/색상 블록이 너무 좁아지지 않도록 보정 */
export const Field = styled.div`
  display: grid;
  gap: 8px;
  min-width: 0;  /* grid-item overflow 방지 */
`;

export const SelectWrap = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  min-width: 220px;
  max-width: 320px;

  /* 커스텀 화살표 */
  &::after {
    content: "";
    position: absolute;
    right: 16px;        /* 오른쪽에서 위치 조정 */
    top: 50%;
    transform: translateY(-50%);
    width: 20px;        /* 아이콘 크기 */
    height: 20px;
    background: url(${downIcon}) no-repeat center center;
    background-size: contain;
    pointer-events: none; /* 클릭 방해 X */
  }
`;

/* 다음 줄 전체폭: 태그 + 옵션 (항상 세로 스택) */
export const TagOptionRow = styled.div`
  grid-column: 1 / -1;       /* 두 컬럼 전체폭 */
  display: grid;
  grid-template-columns: 1fr; /* ✅ 항상 1컬럼 */
  row-gap: 22px;              /* 태그/옵션 간격 증가 */
  margin-top: 8px;            /* 상단 그룹과 분리 */
`;

export const TagOptionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 0;               /* ✅ 내부 칩이 길어도 줄바꿈 가능 */
`;

export const ChipRow = styled.div`
  display: flex;
  gap: 12px;
  /* ✅ 칩이 많아지면 자동 줄바꿈 → 겹침 방지 */
  flex-wrap: wrap;
  max-width: 100%;
  align-items: center;
`;

export const Chip = styled.button`
  width: 125.375px;
  height: 59px;
  padding: 0 18px;
  border-radius: 30px;
  border: none;
  background: ${({ $active }) => ($active ? NAVY : "#eef2f6")};
  color: ${({ $active }) => ($active ? "#fff" : "#667085")};
  cursor: pointer;

  font-family: Pretendard;
  font-size: 27px;
  font-style: normal;
  font-weight: 400;
`;

export const ChipGhost = styled.button.attrs({ type: "button", "aria-label": "태그 추가" })`
  all: unset;              /* 기본 버튼 스타일 제거 */
  cursor: pointer;
  width: 24px;             /* 아이콘 크기에 맞게 조정 */
  height: 24px;
  background: url(${plusIcon}) no-repeat center center;
  background-size: contain; /* 아이콘 원본 비율 유지 */
`;

/* 하단 버튼 */
export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 14px;
  padding: 18px 26px 24px;
  border-top: 1px solid #eef1f5;
`;

export const Secondary = styled.button`
  min-width: 120px;
  width: 185px;
  height: 100px;
  border-radius: 16px;
  border: 2px solid ${NAVY};
  background: #fff;
  color: ${NAVY};
  font-weight: 500;
  font-size: 40px;
  cursor: pointer;
`;

export const Primary = styled.button`
  min-width: 140px;
  width: 185px;
  height: 100px;
  border-radius: 16px;
  border: 0;
  background: ${NAVY};
  color: #fff;
  font-weight: 500;
  font-size: 40px;
  cursor: pointer;
  &:hover { box-shadow: 0 8px 18px rgba(34,55,112,0.22); background: #1f336a; }
`;

