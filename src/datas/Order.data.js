// src/datas/Order.data.js

// 원본 플랫 데이터
export const FLAT_MENU = [
  { menu_id: 1,  name: "아메리카노",        price: 4000, popular: true,  temp: "hot" },
  { menu_id: 2,  name: "아메리카노",        price: 4000, popular: true,  temp: "ice" },
  { menu_id: 3,  name: "카페라떼",          price: 4500, popular: true,  temp: "hot" },
  { menu_id: 4,  name: "카페라떼",          price: 4500, popular: true,  temp: "ice" },
  { menu_id: 5,  name: "바닐라 라떼",       price: 4700, popular: true,  temp: "hot" },
  { menu_id: 6,  name: "바닐라 라떼",       price: 4700, popular: true,  temp: "ice" },
  { menu_id: 7,  name: "카푸치노",          price: 5000, popular: false, temp: "hot" },
  { menu_id: 8,  name: "카푸치노",          price: 5000, popular: false, temp: "ice" },
  { menu_id: 9,  name: "카라멜 마키아토",   price: 4700, popular: false, temp: "hot" },
  { menu_id: 10, name: "카라멜 마키아토",   price: 4700, popular: false, temp: "ice" },
  { menu_id: 11, name: "카페모카",          price: 4700, popular: false, temp: "hot" },
  { menu_id: 12, name: "카페모카",          price: 4700, popular: false, temp: "ice" },

  // 기타 음료
  { menu_id: 13, name: "초코 라떼",         price: 4000, popular: false, temp: "hot" },
  { menu_id: 14, name: "초코 라떼",         price: 4000, popular: false, temp: "ice" },
  { menu_id: 15, name: "녹차 라떼",         price: 4000, popular: false, temp: "hot" },
  { menu_id: 16, name: "녹차 라떼",         price: 4000, popular: false, temp: "ice" },
  { menu_id: 17, name: "밀크티",            price: 4000, popular: false, temp: "hot" },
  { menu_id: 18, name: "밀크티",            price: 4000, popular: false, temp: "ice" },
  { menu_id: 19, name: "레몬에이드",        price: 4500, popular: false, temp: "ice" },
  { menu_id: 20, name: "자몽에이드",        price: 4500, popular: false, temp: "ice" },

  // 주스
  { menu_id: 21, name: "오렌지 주스",       price: 5000, popular: false, temp: "ice" },
  { menu_id: 22, name: "딸기 주스",         price: 5000, popular: false, temp: "ice" },
  { menu_id: 23, name: "키위 주스",         price: 5000, popular: false, temp: "ice" },

  // 차
  { menu_id: 24, name: "캐모마일 티",       price: 4000, popular: false, temp: "hot" },
  { menu_id: 25, name: "페퍼민트 티",       price: 4000, popular: false, temp: "hot" },
  { menu_id: 26, name: "유자차",            price: 4500, popular: false, temp: "hot" },
  { menu_id: 27, name: "레몬티",            price: 4500, popular: false, temp: "hot" },

  // 디저트
  { menu_id: 28, name: "치즈케이크",        price: 5500, popular: false, temp: "none" },
  { menu_id: 29, name: "티라미수",          price: 5500, popular: false, temp: "none" },
  { menu_id: 30, name: "마카롱 (3개)",      price: 5000, popular: false, temp: "none" },
  { menu_id: 31, name: "크루아상",          price: 4000, popular: false, temp: "none" },
  { menu_id: 32, name: "초코 머핀",         price: 3500, popular: false, temp: "none" },
  { menu_id: 33, name: "플레인 스콘",       price: 3500, popular: false, temp: "none" },

  // 스무디
  { menu_id: 34, name: "블루베리 요거트 스무디", price: 5800, popular: false, temp: "ice" },
  { menu_id: 35, name: "망고 요거트 스무디",     price: 5800, popular: false, temp: "ice" },
  { menu_id: 36, name: "딸기 바나나 스무디",     price: 6000, popular: false, temp: "ice" },
  { menu_id: 37, name: "플레인 요거트 스무디",   price: 5500, popular: false, temp: "ice" },

  // 프라페
  { menu_id: 38, name: "말차 프라페",       price: 5500, popular: false, temp: "ice" },
  { menu_id: 39, name: "초콜릿 프라페",     price: 5500, popular: false, temp: "ice" },

  // 특색 라떼
  { menu_id: 40, name: "흑임자 라떼",       price: 5000, popular: false, temp: "hot" },
  { menu_id: 41, name: "흑임자 라떼",       price: 5500, popular: false, temp: "ice" },
  { menu_id: 42, name: "곡물 라떼",         price: 5000, popular: false, temp: "hot" },

  // 스페셜 티
  { menu_id: 43, name: "자몽 허니 블랙티",  price: 4800, popular: false, temp: "hot" },
  { menu_id: 44, name: "레몬 허니 블랙티",  price: 4800, popular: false, temp: "hot" },

  // 에이드
  { menu_id: 45, name: "블루 레몬 에이드",  price: 4800, popular: false, temp: "ice" },
  { menu_id: 46, name: "청포도 에이드",     price: 4800, popular: false, temp: "ice" },

  // 버블티
  { menu_id: 47, name: "흑당 버블 밀크티",  price: 5500, popular: false, temp: "ice" },
  { menu_id: 48, name: "제주 말차 버블 라떼", price: 5800, popular: false, temp: "ice" },
];

// 문자열을 안전한 id로
function slugify(s) {
  return String(s)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[()]/g, "")
}

// 탭 필터 type 분류 (우선순위 중요)
// '버블티'가 tea로 가지 않도록 drink를 먼저 검사
function detectType(name) {
  if (/(주스|에이드|스무디|프라페|버블)/.test(name)) return "drink";
  if (/(케이크|티라미수|마카롱|크루아상|머핀|스콘)/.test(name)) return "dessert";
  if (/(차|티|블랙티)/.test(name)) return "tea";
  return "coffee";
}

// hot/ice/none → 표시용
function tempLabel(temp) {
  if (temp === "hot") return "핫";
  if (temp === "ice") return "아이스";
  return "";
}

// 플랫 → 화면용 섹션 구조
export function buildMenuDataFromFlat(flat = FLAT_MENU) {
  const sectionMap = new Map();

  flat.forEach((row) => {
    const baseName = row.name;
    const sectionId = slugify(baseName) || `section-${row.menu_id}`;
    const type = detectType(baseName);

    if (!sectionMap.has(sectionId)) {
      sectionMap.set(sectionId, { id: sectionId, title: baseName, products: [] });
    }

    const label = tempLabel(row.temp);
    const displayName = label ? `${baseName} (${label})` : baseName;

    sectionMap.get(sectionId).products.push({
      id: `${sectionId}-${row.temp || "none"}`,
      name: displayName,
      price: Number(row.price) || 0,
      popular: !!row.popular,
      type,
      image: null,
      tags: row.temp && row.temp !== "none" ? [row.temp] : [],
      options: [],
      sectionId,
    });
  });

  const sections = Array.from(sectionMap.values()).sort((a, b) =>
    a.title.localeCompare(b.title, "ko")
  );

  return [{ id: "all", label: "모든 메뉴", sections }];
}

// OrderPage.jsx가 import하는 이름 유지
export const MENU_DATA = buildMenuDataFromFlat();
