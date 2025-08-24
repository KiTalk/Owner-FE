// src/api/menu.js
export async function fetchMenu() {
  // 실제 연동 시: /api/menu 같은 엔드포인트로 변경
  try {
    const res = await fetch("/api/menu", { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error("Failed to fetch menu");
    const json = await res.json();
    // 서버가 { data: [...] } 형태일 수도 있으니 안전 변환
    return Array.isArray(json) ? json : (json?.data ?? []);
  } catch {
    // 실패하면 빈 배열 반환 → OrderPage에서 기본 MENU_DATA 그대로 사용
    return [];
  }
}
