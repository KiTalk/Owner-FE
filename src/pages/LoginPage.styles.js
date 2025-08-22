import styled from "styled-components";

/** 유틸: 숫자는 px로, 문자열은 그대로 */
const px = (v, fallback) =>
  v === undefined ? (fallback !== undefined ? px(fallback) : undefined)
  : typeof v === "number" ? `${v}px` : v;

/** 공통 색상 */
const NAVY = "#223770";
const BG = "#F2F6FB";
const INPUT_BORDER = "#C0C0C0";
const PLACEHOLDER = "#787878";
const TEXT = "#262727";

/** 전체 화면 컨테이너: 배경 + 중앙 정렬 */
export const Screen = styled.div`
  width: 1440px;
  height: 1024px;
  margin: 0 auto;
  background: ${BG};
  overflow: hidden;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, sans-serif;

  display: grid;
  place-items: center;

  @media (min-width: 1441px) {
    box-shadow: 0 0 20px rgba(0,0,0,0.1);
  }
  @media (max-width: 1439px) {
    width: 100vw;
    height: 100vh;
    min-height: 600px;
  }
`;

/** 로고 영역: 상단 중앙 */
export const LogoContainer = styled.div`
  display: grid;
  justify-items: center;
  margin-bottom: 0; /* 로고-입력 간격 */
`;

export const LogoImage = styled.img`
  width: 264.24px;
  height: 56.45px;
  object-fit: contain;
`;

/** 폼 레이아웃 */
export const Form = styled.form`
  display: grid;
  gap: 12px;
`;

export const Field = styled.div`
  display: grid;
`;

/** 공통 입력 필드: 둥근 캡슐 형태 */
export const Input = styled.input`
  width: 590px;
  height: 100px;
  box-sizing: border-box;
  padding: 0 18px;
  padding-left: 48px;          /* 텍스트 오른쪽으로 30px 더 밀기(18+30) */
  border-radius: 50px;
  border: 1px solid ${INPUT_BORDER};
  background: #fff;
  font-size: 25px;
  color: ${TEXT};
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  margin-top: -18rem;

  &::placeholder { color: ${PLACEHOLDER}; }
  &:focus {
    border-color: ${NAVY};
    box-shadow: 0 0 0 3px rgba(34, 55, 112, 0.12);
  }
`;

/** 비밀번호 입력 + 보기/숨김 버튼을 한 줄에 */
export const PasswordRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
`;

export const TogglePwButton = styled.button`
  height: 40px;
  padding: 0 14px;
  border-radius: 20px;
  border: 1px solid ${INPUT_BORDER};
  background: #fff;
  font-weight: 600;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.1s ease;

  &:hover { background: #f9fafb; }
  &:active { transform: translateY(0.5px); }
`;

/** 옵션 행: 좌측 체크 그룹, 우측 링크들 */
export const OptionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 6px;
`;

/** 자동 로그인 클릭 영역 */
export const LeftOption = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: -150px;  
  border: 0;
  padding: 0;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  text-align: left;
  position: relative; /* 겹침 제어를 위해 포지셔닝 생성 */
  z-index: 2;         /* RightLinks보다 위로 */  

  /* 라벨 텍스트 사이즈/간격 조절 */
  span {
    font-size: ${({ $labelSize }) => px($labelSize, "13px")};
    line-height: 1.2;
  }
`;

/** CheckImage + Checkbox 그룹 */
export const CheckGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ $gap }) => px($gap, 6)}; /* 아이콘-체크박스 간격 */
`;

/** 체크 아이콘 (사이즈 조절 가능) */
export const CheckImage = styled.img`
  width: ${({ $size }) => px($size, 16)};
  height: ${({ $size }) => px($size, 16)};
  object-fit: contain;
  vertical-align: middle;
`;

/** 체크 아이콘 감싸는 래퍼/오버레이(겹치기) */
export const CheckWrap = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ $size }) => px($size, 16)};
  height: ${({ $size }) => px($size, 16)};
`;
export const CheckOverlay = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`;

/** 원형 체크박스 (사이즈 조절 가능) */
export const Checkbox = styled.span`
  width: ${({ $size }) => px($size, 16)};
  height: ${({ $size }) => px($size, 16)};
  border-radius: 50%;
  border: 1.5px solid ${INPUT_BORDER};
  display: inline-block;
  position: relative;

  &[data-checked="true"] {
    border-color: ${NAVY};
    background: ${NAVY};
  }
`;

/** 우측 링크 묶음: 고정 오프셋(기본 -150px 위로) */
export const RightLinks = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 10px;
  color: #6b7280;
  font-size: 20px;

  .divider { color: #c7cad1; }

  /* 고정 위치값 (이전 기본값과 동일) */
  margin-top: -150px;
`;

/** 링크 버튼 */
export const LinkBtn = styled.button`
  border: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  cursor: pointer;

  &:hover {
    color: ${NAVY};
    text-decoration: underline;
  }
`;

/** 검증 실패 시 메시지 */
export const ErrorText = styled.div`
  margin-top: 4px;
  color: #d12c37;
  font-size: 13px;
`;

/** 네이비 채움 버튼 (고정 크기/오프셋: 이전 기본값과 동일) */
export const PrimaryBtn = styled.button`
  width: 590px;
  height: 100px;
  margin: -50px 0 0 0;       /* top -50px, 좌우 0, 아래 0 */
  border: none;
  border-radius: 26px;
  background: ${NAVY};
  color: #fff;
  font-weight: 600;
  font-size: 25px;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.18s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(34,55,112,0.22);
    background: #1f336a;
  }
  &:active { transform: translateY(0); }
`;

/** 외곽선 버튼 (고정 크기/오프셋: 이전 기본값과 동일) */
export const SecondaryBtn = styled.button`
  width: 590px;
  height: 100px;
  margin: 8px 0 0 0;         /* top 8px, 좌우 0, 아래 0 */
  border-radius: 26px;
  border: 1.5px solid ${NAVY};
  background: #fff;
  color: ${NAVY};
  font-weight: 600;
  font-size: 25px;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover { background: #f7f9ff; }
`;
