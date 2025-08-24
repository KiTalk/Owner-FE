// src/api/menuApi.js
const STORAGE_KEY = "menu:v1";

/** 메뉴 데이터를 로컬 스토리지에서 읽어오고, 없으면 fallback을 반환 */
export async function fetchMenu(fallback = []) {
  if (typeof window === "undefined" || !window.localStorage) {
    // 비브라우저 환경: 저장 시도 없이 fallback 반환
    return fallback;
  }
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // 파싱 실패 시 초기화
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }
  // 최초 로딩은 더미(fallback)로 채우고 저장
  await saveMenu(fallback);
  return fallback;
}

/** 메뉴 전체를 저장 */
export async function saveMenu(menu) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
  return true;
}

/** 섹션 제목 수정 */
export async function updateSectionTitleAPI(menu, sectionId, newTitle) {
  const next = menu.map((group) =>
    group.id !== "all"
      ? group
      : {
          ...group,
          sections: group.sections.map((s) =>
            s.id === sectionId ? { ...s, title: newTitle } : s
          ),
        }
  );
  await saveMenu(next);
  return next;
}

/**
 * 상품 추가/수정
 * - updated._isNew === true 이면 "추가"
 * - 이미 id가 있고 _isNew가 false면 "수정"
 * - 이미지/태그/옵션도 반영
 */
export async function upsertProductAPI(menu, updated) {
  let nextMenu = menu;
  const isNew = !updated?.id || updated?._isNew;

  // id 생성 규칙: {sectionId}-{timestamp}
  const ensureId = (p) =>
    p?.id || `${p.sectionId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  nextMenu = menu.map((group) => {
    if (group.id !== "all") return group;

    const nextSections = group.sections.map((s) => {
      if (isNew) {
        if (s.id !== updated.sectionId) return s;
        const newProduct = {
          id: ensureId(updated),
          name: updated.name || "",
          price: Number.isFinite(Number(updated.price)) ? Number(updated.price) : 0,
          type: updated.type || "coffee",
          popular: !!updated.popular,
          image: updated.image || null,
          tags: Array.isArray(updated.tags) ? updated.tags : [],
          options: Array.isArray(updated.options) ? updated.options : [],
        };
        return { ...s, products: [...s.products, newProduct] };
      } else {
        // 수정: 섹션에 상관없이 id로 매칭
        const hasTarget = s.products.some((p) => p.id === updated.id);
        if (!hasTarget) return s;
        const products = s.products.map((p) =>
          p.id === updated.id
            ? {
                ...p,
                name: updated.name ?? p.name,
                price: Number.isFinite(Number(updated.price)) ? Number(updated.price) : p.price,
                type: updated.type ?? p.type,
                popular: typeof updated.popular === "boolean" ? updated.popular : p.popular,
                image: updated.image === undefined ? (p.image ?? null) : updated.image,
                tags: Array.isArray(updated.tags) ? updated.tags : (p.tags ?? []),
                options: Array.isArray(updated.options) ? updated.options : (p.options ?? []),
              }
            : p
        );
        return { ...s, products };
      }
    });

    return { ...group, sections: nextSections };
  });

  await saveMenu(nextMenu);
  return nextMenu;
}
