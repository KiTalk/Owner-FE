// src/utils/storage.js

// 저장소 키 상수
const CART_KEY = "cart:v1";
const MENU_KEY = "menu:v1";

/* ✅ 장바구니 관련 */
export function saveCart(cartItems) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch (err) {
    console.error("장바구니 저장 실패:", err);
  }
}

export function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("장바구니 불러오기 실패:", err);
    return [];
  }
}

export function clearCart() {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (err) {
    console.error("장바구니 초기화 실패:", err);
  }
}

/* ✅ 메뉴 관련 */
export function saveMenu(menu) {
  try {
    localStorage.setItem(MENU_KEY, JSON.stringify(menu));
  } catch (err) {
    console.error("메뉴 저장 실패:", err);
  }
}

export function loadMenu(fallback = []) {
  try {
    const raw = localStorage.getItem(MENU_KEY);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error("메뉴 불러오기 실패:", err);
    return fallback;
  }
}

export function clearAllAddedTotals() {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("전체 로컬스토리지 초기화 실패:", err);
  }
}

export function getStorageKey(type = "menu") {
  switch (type) {
    case "cart":
      return "cart:v1";
    case "menu":
      return "menu:v1";
    default:
      return `${type}:v1`;
  }
}

export function normalizeId(id) {
  if (id == null) return "";
  return String(id).trim().toLowerCase();
}