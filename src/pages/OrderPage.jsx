import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page, Hero, HeroInner, HeroTitle,
  CartWidget, CartText, CartTextWrap,
  Section, SectionTitle, EditIcon,
  ProductRow, AddTile, PlusIcon,
  FooterCta, SmallPlus,
  ProfileImage,                   // ✅ 추가: 스타일로 분리한 프로필 이미지
} from "./OrderPage.styles";
import fixImage from "../assets/images/edit.png";
import profileImage from "../assets/images/profile.png";
import { MENU_DATA } from "../datas/Order.data";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import MenuEdit from "../pages/MenuEdit";

/* Context */
import CartProvider from "../components/CartProvider.jsx";
import { useCart } from "../components/CartContext";

/* 탭 목록을 상수로 관리 */
const TABS = [
  { id: "all",     label: "모든 메뉴" },
  { id: "coffee",  label: "커피" },
  { id: "tea",     label: "차" },
  { id: "drink",   label: "음료" },
  { id: "dessert", label: "디저트" },
];

/* added_total_* 키 전체 삭제 (담은 수량 오버레이 리셋용) */
function clearAllAddedTotals() {
  if (typeof window === "undefined" || !window.localStorage) return;
  const ls = window.localStorage;
  for (let i = ls.length - 1; i >= 0; i--) {
    const key = ls.key(i);
    if (key && key.startsWith("added_total_")) ls.removeItem(key);
  }
}

export default function TouchOrderPage() {
  return (
    <CartProvider>
      <TouchOrderContent />
    </CartProvider>
  );
}

function TouchOrderContent() {
  const navigate = useNavigate();
  const { totalQty } = useCart();

  const [activeTabId, setActiveTabId] = useState("all");
  const [menu, setMenu] = useState(MENU_DATA);
  const [loading] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // 제품 편집/추가 모달 대상

  /* 장바구니 비면 오버레이 카운트 리셋 */
  useEffect(() => {
    if (Number(totalQty ?? 0) === 0) clearAllAddedTotals();
  }, [totalQty]);

  /* 'all' 데이터에서 현재 탭에 맞게 섹션/상품 필터링 */
  const allMenu = Array.isArray(menu) ? menu.find((m) => m.id === "all") : null;
  const baseSections = allMenu?.sections ?? [];

  const filteredSections = baseSections
    .map((sec) => {
      const filteredProducts =
        activeTabId === "all"
          ? sec.products
          : sec.products.filter((p) => p.type === activeTabId);
      return { ...sec, products: filteredProducts };
    })
    .filter((sec) => (activeTabId === "all" ? true : sec.products.length > 0));

  function handleCartClick() {
    navigate("/order/cart");
  }

  // 제품 편집(기존) → 모달 오픈
  function handleEdit(product) {
    setEditTarget(product);
  }

  // 저장 시: 신규면 추가, 기존이면(추후) 업데이트 자리
  const handleEditSave = (updated) => {
    if (!updated) return;

    if (!updated.id || updated._isNew) {
      const newId = `${updated.sectionId}-${Date.now()}`;
      const newProduct = {
        id: newId,
        name: updated.name || "",
        price: Number(updated.price) || 0,
        type: updated.type || "coffee",
        popular: !!updated.popular,
      };

      setMenu((prev) =>
        prev.map((group) =>
          group.id !== "all"
            ? group
            : {
                ...group,
                sections: group.sections.map((s) =>
                  s.id === updated.sectionId
                    ? { ...s, products: [...s.products, newProduct] }
                    : s
                ),
              }
        )
      );

      alert("새 메뉴가 추가되었습니다. (API 연동 시 서버에도 저장하세요)");
      setEditTarget(null);
      return;
    }

    alert("수정 사항이 저장되었습니다. (API 연동 시 서버에도 반영하세요)");
    setEditTarget(null);
  };

  // 섹션명 변경
  function handleEditSectionTitle(sectionId, currentTitle) {
    const next = window.prompt("새 섹션명을 입력하세요", currentTitle);
    if (!next) return;
    const trimmed = next.trim();
    if (!trimmed || trimmed === currentTitle) return;

    setMenu((prev) =>
      prev.map((group) =>
        group.id !== "all"
          ? group
          : {
              ...group,
              sections: group.sections.map((s) =>
                s.id === sectionId ? { ...s, title: trimmed } : s
              ),
            }
      )
    );
  }

  // + 아이콘 → 빈 모달 추가
  function handleAddNew(sectionId) {
    const defaultType = activeTabId !== "all" ? activeTabId : "coffee";
    setEditTarget({
      _isNew: true,
      id: null,
      name: "",
      price: 0,
      type: defaultType,
      popular: false,
      sectionId,
      image: null,
    });
  }

  const handleOpenMyPage = () => {
    // 프로젝트 라우터에서 MyPage.jsx가 매핑된 경로로 바꿔도 됩니다.
    navigate("/mypage");
  };

  return (
    <Page>
      <Hero>
        <HeroInner>
          <HeroTitle>내가커피 사장님 안녕하세요!</HeroTitle>
          <CartWidget onClick={handleCartClick}>
            <CartTextWrap>
              <CartText>주문 목록</CartText>
            </CartTextWrap>
          </CartWidget>

          {/* ✅ 버튼 옆(바깥쪽)에 프로필 이미지 */}
          <ProfileImage
            src={profileImage}
            alt="프로필"
            onClick={handleOpenMyPage}
            title="내 정보"
          />
        </HeroInner>
      </Hero>

      {/* 상단 탭 */}
      <CategoryTabs tabs={TABS} activeId={activeTabId} onChange={setActiveTabId} />

      {loading && (
        <Section>
          <SectionTitle>불러오는 중…</SectionTitle>
        </Section>
      )}

      {filteredSections.map((section) => (
        <Section key={section.id}>
          <SectionTitle>
            {section.title}
            <EditIcon
              src={fixImage}
              alt="섹션명 편집"
              style={{ cursor: "pointer" }}
              onClick={() => handleEditSectionTitle(section.id, section.title)}
            />
          </SectionTitle>

          <ProductRow>
            {section.products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                mode="owner"
                onEdit={handleEdit}
              />
            ))}

            {/* 섹션별 + 타일 1개 — 상품이 3의 배수면 다음 줄 중앙 배치 */}
            <AddTile
              onClick={() => handleAddNew(section.id)}
              aria-label="새 상품 추가"
              style={
                section.products.length % 3 === 0
                  ? { gridColumn: "2", justifySelf: "center" }
                  : undefined
              }
            >
              <PlusIcon />
            </AddTile>
          </ProductRow>
        </Section>
      ))}

      {/* 하단 CTA */}
      <FooterCta onClick={() => navigate("/categories/new")}>
        메뉴 구분 추가하기 <SmallPlus />
      </FooterCta>

      {/* 편집/추가 모달 */}
      <MenuEdit
        open={!!editTarget}
        product={editTarget}
        sections={filteredSections.map((s) => ({ id: s.id, title: s.title }))}
        onClose={() => setEditTarget(null)}
        onSave={handleEditSave}
      />
    </Page>
  );
}
