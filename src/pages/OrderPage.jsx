import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page, Hero, HeroInner, HeroTitle,
  CartWidget, CartText, CartTextWrap,
  Section, SectionTitle, EditIcon,
  ProductRow, PlusIcon,
  FooterCta, SmallPlus,
  ProfileImage,
} from "./OrderPage.styles";
import fixImage from "../assets/images/edit.png";
import profileImage from "../assets/images/profile.png";
import { MENU_DATA } from "../datas/Order.data";
import CategoryTabs from "../components/CategoryTabs";
import ProductCard from "../components/ProductCard";
import MenuEdit from "../pages/MenuEdit";

/* Context */
import CartProvider from "../components/CartProvider.jsx";

/* 로컬 스토리지 키 (임시 저장용) */
const STORAGE_KEY = "menu:v1";

const TABS = [
  { id: "all",     label: "모든 메뉴" },
  { id: "coffee",  label: "커피" },
  { id: "tea",     label: "차" },
  { id: "drink",   label: "음료" },
  { id: "dessert", label: "디저트" },
];

/* 로컬 저장/불러오기 유틸 */
function loadMenuLS(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function saveMenuLS(menu) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
  } catch {
    // 아무 처리도 안 함
  }
}

function getStoredUserName() {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.userName || parsed?.userId || null;
  } catch {
    return null;
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
  const userName = getStoredUserName() || "사장님";

  const [activeTabId, setActiveTabId] = useState("all");
  const [menu, setMenu] = useState(MENU_DATA);
  const [loading] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  // 유효한 상품: 이름이 있거나 가격>0
  const isValidProduct = (p) =>
    !!p &&
    (String(p.name || "").trim().length > 0 || (p.price != null && Number(p.price) > 0));

  // 최초 로딩: localStorage → 없으면 더미 저장
  useEffect(() => {
    const loaded = loadMenuLS(MENU_DATA);
    setMenu(loaded);
    if (loaded === MENU_DATA) saveMenuLS(MENU_DATA);
  }, []);
  const groups = Object.fromEntries((Array.isArray(menu) ? menu : []).map(g => [g.id, g]));
  const CATEGORY_IDS = ["coffee", "tea", "drink", "dessert"];

  // 📌 activeTabId별 섹션 원본 목록 (all은 모든 카테고리 섹션을 합쳐서 보여줌)
  const baseSections =
    activeTabId === "all"
      ? CATEGORY_IDS.flatMap(cat =>
          (groups[cat]?.sections ?? []).map(s => ({ ...s, __owner: cat }))
        )
      : (groups[activeTabId]?.sections ?? []);

  const filteredSections = baseSections
    .map((sec) => {
      const base = (sec.products || []).filter(isValidProduct);
      const filteredProducts =
        activeTabId === "all" ? base : base.filter((p) => p.type === activeTabId);
      return { ...sec, products: filteredProducts };
    });

  const handleCartClick = () => navigate("/menu/list");
  const handleEdit = (product) => setEditTarget(product);

 // ✅ 하단 버튼: 섹션(메뉴 구분) 추가 (카테고리별 저장)
 const handleAddSection = () => {
   const targetCat = activeTabId === "all" ? "coffee" : activeTabId; // all이면 기본 'coffee'
   setMenu((prev) => {
     const ts = Date.now();
     const newSectionId = `${targetCat}-section-${ts}`;
     const newSection = { id: newSectionId, title: "새로운 섹션", products: [] };

     // 1) target 카테고리 그룹이 없으면 생성
     const existed = Array.isArray(prev) && prev.some(g => g.id === targetCat);
     let next = existed ? [...prev] : [...(prev || []), { id: targetCat, sections: [] }];

     // 2) 해당 카테고리에 섹션 추가
     next = next.map(group => {
       if (group.id !== targetCat) return group;
       const sections = group.sections || [];
       if (sections.some(s => s.id === newSectionId)) return group; // 중복 방지
       return { ...group, sections: [...sections, newSection] };
     });

     // 디버그 로그
     console.log("[handleAddSection] targetCat:", targetCat,
                 "added:", newSectionId,
                 "sections:", next.find(g=>g.id===targetCat)?.sections?.map(s=>s.id));

     saveMenuLS(next);
     return next;
   });
 };  

 // 저장: 삭제 / 신규 / 수정(+섹션이동)
  const handleEditSave = (updated) => {
    const beforeSectionId = editTarget?.sectionId; // 이동 여부 비교용(알림 메시지)
    if (!updated) return;

    setMenu((prev) => {
      const next = prev.map((group) => {
        // if (group.id !== "all") return group;

        // 섹션 단위 변경 준비
        let sections = group.sections.map((s) => ({ ...s, products: [...(s.products || [])] }));

        // 삭제
        if (updated._delete) {
          sections = sections.map((s) => ({
            ...s,
            products: s.products.filter((p) => p.id !== updated.id),
          }));
          const withDeleted = { ...group, sections };
          const finalMenu = prev.map((g) => (g.id === "all" ? withDeleted : g));
          saveMenuLS(finalMenu);
          return withDeleted;
        }

        // 신규 추가
        if (!updated.id || updated._isNew) {
          const newId = `${updated.sectionId}-${Date.now()}`;
          const newProduct = {
            id: newId,
            name: updated.name || "",
            price: Number(updated.price) || 0,
            type: updated.type || "coffee",
            popular: !!updated.popular,
            image: updated.image ?? null,
            tags: Array.isArray(updated.tags) ? updated.tags : [],
            options: Array.isArray(updated.options) ? updated.options : [],
            sectionId: updated.sectionId,
          };
          sections = sections.map((s) =>
            s.id === updated.sectionId ? { ...s, products: [...s.products, newProduct] } : s
          );
          const withAdded = { ...group, sections };
          const finalMenu = prev.map((g) => (g.id === "all" ? withAdded : g));
          saveMenuLS(finalMenu);
          return withAdded;
        }

        // 기존 수정 (섹션 이동 포함)
        const prevSectionId =
          beforeSectionId ??
          group.sections.find((s) => (s.products || []).some((p) => p.id === updated.id))?.id ??
          updated.sectionId;

        // 1) 기존 섹션에서 제거
        if (prevSectionId) {
          sections = sections.map((s) =>
            s.id === prevSectionId
              ? { ...s, products: s.products.filter((p) => p.id !== updated.id) }
              : s
          );
        }

        // 2) 새 섹션에 추가(동일 id 유지, 내용 업데이트)
        const updatedProduct = {
          id: updated.id,
          name: updated.name ?? "",
          price: Number(updated.price ?? 0),
          type: updated.type ?? "coffee",
          popular: !!updated.popular,
          image: updated.image ?? null,
          tags: Array.isArray(updated.tags) ? updated.tags : [],
          options: Array.isArray(updated.options) ? updated.options : [],
          sectionId: updated.sectionId,
        };

        sections = sections.map((s) =>
          s.id === updated.sectionId
            ? { ...s, products: [...s.products, updatedProduct] }
            : s
        );

        const withMoved = { ...group, sections };
        const finalMenu = prev.map((g) => (g.id === "all" ? withMoved : g));
        saveMenuLS(finalMenu);
        return withMoved;
      });

      return next;
    });

    alert(
      updated._delete
        ? "메뉴가 삭제되었습니다."
        : updated._isNew
        ? "새 메뉴가 추가되었습니다."
        : updated.sectionId !== (beforeSectionId ?? updated.sectionId)
        ? "수정 사항이 저장되고 섹션이 변경되었습니다."
        : "수정 사항이 저장되었습니다."
    );
    setEditTarget(null);
  };

  // 섹션명 변경
 const handleEditSectionTitle = (sectionId, currentTitle, ownerGroupId) => {
   const input = window.prompt(
     "새 섹션명을 입력하세요 (비우면 섹션이 삭제됩니다)",
     currentTitle
   );
   if (input === null) return; // 취소
   const trimmed = (input || "").trim();

   setMenu((prev) => {
     const next = prev.map((group) => {
       if (group.id !== ownerGroupId) return group;

       // ✅ 제목이 비었으면 섹션 삭제
       if (!trimmed) {
         return {
           ...group,
           sections: (group.sections || []).filter((s) => s.id !== sectionId),
         };
       }

       // 제목 동일하면 변경 없음
       if (trimmed === currentTitle) return group;

       // 제목 수정
       return {
         ...group,
         sections: (group.sections || []).map((s) =>
           s.id === sectionId ? { ...s, title: trimmed } : s
         ),
       };
     });
     saveMenuLS(next);
     return next;
   });

   if (!trimmed) alert("빈 제목으로 확인하여 섹션을 삭제했습니다.");
 };

  // + 아이콘 → 빈 모달 추가
  const handleAddNew = (sectionId) => {
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
  };

  return (
    <Page>
      <Hero>
        <HeroInner>
          <HeroTitle>{userName} 사장님 안녕하세요!</HeroTitle>
          <CartWidget onClick={handleCartClick}>
            <CartTextWrap>
              <CartText>주문 목록</CartText>
            </CartTextWrap>
          </CartWidget>
          <ProfileImage
            src={profileImage}
          />
        </HeroInner>
      </Hero>

      <CategoryTabs
        tabs={TABS}
        activeId={activeTabId}
        onChange={setActiveTabId}
        onAdd={() => navigate("/categories/new")}  // ✅ + 버튼 동작
      />

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
              onClick={() =>
                handleEditSectionTitle(
                  section.id,
                  section.title,
                  section.__owner || activeTabId
                )
              }
             />
          </SectionTitle>

          <ProductRow>
            {section.products.map((item) => (
              <ProductCard key={item.id} product={item} mode="owner" onEdit={handleEdit} />
            ))}
              <PlusIcon
              onClick={() => handleAddNew(section.id)}
              aria-label="새 상품 추가"
              style={
                section.products.length % 3 === 0
                  ? { gridColumn: "2", justifySelf: "center" }
                  : undefined
              } />
          </ProductRow>
        </Section>
      ))}

      <FooterCta onClick={handleAddSection}>
        메뉴 구분 추가하기 <SmallPlus />
      </FooterCta>

      <MenuEdit
        open={!!editTarget}
        product={editTarget}
        sections={baseSections.map((s) => ({ id: s.id, title: s.title }))}
        onClose={() => setEditTarget(null)}
        onSave={handleEditSave}
      />
    </Page>
  );
}
