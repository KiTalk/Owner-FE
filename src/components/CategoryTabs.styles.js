import styled from "styled-components";
import bigPlus from "../assets/images/bigplus.png";

/** 카테고리 바 전체 */
export const TabsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1440px;
  margin: 0 auto;
  padding: 0 50px;
  gap: 10px;
  background: #F2F6FB;
  border-bottom: 1px solid #dce3ec;
`;

/** 각 카테고리 버튼 */
export const TabButton = styled.button`
  flex: 1 1 0;  /* ✅ 개수에 따라 폭 자동 분배 */
  min-width: 0;
  height: 90px;
  padding: 12px 0;
  border: none;
  border-radius: 20px 20px 0 0;
  background: ${({ $active }) => ($active ? "#FFF" : "#53669D")};
  color: ${({ $active }) => ($active ? "#272727" : "#FFF")};
  font-weight: 500;
  font-size: 40px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const PlusIcon = styled.img.attrs({
  src: bigPlus,
  alt: "카테고리 추가",
})`
  flex: 0 0 44px;
  height: 44px;
  cursor: pointer;
  object-fit: contain;
`;