import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  ProductCard as ProductCardBox,
  PopularTag,
  ImageArea,
  ProductImage,
  InfoArea,
  ProductName,
  ProductPrice,
  QuantityRow,
  QuantityButton,
  QuantityValue,
  NameRow,
  TemperatureBadge,
  AddedOverlay,
  EditChip,
} from "./ProductCard.styles";
import { getStorageKey, normalizeId } from "../utils/storage";
import americanoIceImg from "../assets/images/americano-ice.png";

const LS = typeof window !== "undefined" ? window.localStorage : null;

export default function ProductCard({
  product,
  mode = "order",     // "order" | "cart" | "owner"
  cartQty = 0,
  onIncrease,
  onDecrease,
  onEdit,
}) {
  const normId = normalizeId(product?.id);

  // ── 훅은 항상 최상단에서 호출 ────────────────────────────────
  const [quantity, setQuantity] = useState(0);
  const [addedTotal, setAddedTotal] = useState(() => {
    if (!normId || !LS) return 0;
    const raw = LS.getItem(getStorageKey(normId));
    const n = raw != null ? Number(raw) : 0;
    return Number.isFinite(n) ? n : 0;
  });

  const getTemperatureLabel = (id) => {
    if (!id) return null;
    const lowered = String(id).toLowerCase();
    if (lowered.includes("ice")) return "시원한";
    if (lowered.includes("hot")) return "뜨거운";
    return null;
  };

  const temperatureLabel = getTemperatureLabel(product?.id);
  const temperatureVariant =
    temperatureLabel === "시원한" ? "cold" : temperatureLabel === "뜨거운" ? "hot" : null;

  const handleMinus = () => setQuantity((q) => Math.max(0, q - 1));
  const handlePlus  = () => setQuantity((q) => q + 1);
  const handleCartMinus = () =>
    typeof onDecrease === "function" && onDecrease(product?.id);
  const handleCartPlus  = () =>
    typeof onIncrease === "function" && onIncrease(product?.id);

  useLayoutEffect(() => {
    if (!normId) { setAddedTotal(0); return; }
    const key = getStorageKey(normId);

    if (mode === "cart") {
      const q = Number(cartQty ?? 0);
      setAddedTotal(q);
      if (!LS) return;
      if (q > 0) LS.setItem(key, String(q));
      else LS.removeItem(key);
    } else {
      if (!LS) { setAddedTotal(0); return; }
      const raw = LS.getItem(key);
      const n = raw != null ? Number(raw) : 0;
      setAddedTotal(Number.isFinite(n) ? n : 0);
    }
  }, [mode, cartQty, normId]);

  useEffect(() => {
    if (mode !== "order" || !normId) return;
    const key = getStorageKey(normId);
    const sync = () => {
      if (!LS) { setAddedTotal(0); return; }
      const raw = LS.getItem(key);
      const n = raw != null ? Number(raw) : 0;
      setAddedTotal(Number.isFinite(n) ? n : 0);
    };
    sync();
    const onFocus = () => sync();
    const onVis   = () => !document.hidden && sync();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mode, normId]);

  // ── 여기서부터 조건부 렌더링 검사 (훅 호출 이후) ─────────────
  const isEmptyProduct =
    !product ||
    (!String(product?.name || "").trim() &&
      (product?.price == null || Number(product?.price) === 0));

  if (mode === "owner" && isEmptyProduct) {
    return null; // 이제 훅은 이미 호출된 상태라 규칙 위반 아님
  }

  const displayedQty = mode === "cart" ? Number(cartQty ?? 0) : quantity;
  const overlayCount = addedTotal;
  const showOverlay  = mode === "order" && overlayCount > 0;

  return (
    <ProductCardBox>
     {Array.isArray(product?.tags) && product.tags.includes("인기") && (
       <PopularTag>인기</PopularTag>
     )}

      {typeof onEdit === "function" && (
        <EditChip type="button" onClick={() => onEdit(product)}>편집</EditChip>
      )}

      <ImageArea $variant={temperatureVariant}>
        {product?.image ? (
          <ProductImage src={product.image} alt={product?.name || ""} />
        ) : product?.id === "americano-ice" ? (
          <ProductImage src={americanoIceImg} alt={product?.name || "아메리카노 아이스"} />
        ) : null}
      </ImageArea>

      <InfoArea>
        <AddedOverlay $show={showOverlay} aria-live="polite">
          {overlayCount}개 담김
        </AddedOverlay>

        <NameRow>
          <ProductName>{product?.name}</ProductName>
          {temperatureLabel && (
            <TemperatureBadge $variant={temperatureVariant}>{temperatureLabel}</TemperatureBadge>
          )}
        </NameRow>

        <ProductPrice>{Number(product?.price ?? 0).toLocaleString()}원</ProductPrice>

        {mode !== "owner" && (
          <QuantityRow>
            {mode === "cart" ? (
              <>
                <QuantityButton $type="minus" onClick={handleCartMinus} />
                <QuantityValue>{displayedQty}</QuantityValue>
                <QuantityButton $type="plus" onClick={handleCartPlus} />
              </>
            ) : (
              <>
                <QuantityButton $type="minus" onClick={handleMinus} />
                <QuantityValue>{displayedQty}</QuantityValue>
                <QuantityButton $type="plus" onClick={handlePlus} />
              </>
            )}
          </QuantityRow>
        )}
      </InfoArea>
    </ProductCardBox>
  );
}
