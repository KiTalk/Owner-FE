import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Overlay, Dialog, Header, HeaderBar, Title,
  Body, LeftCol, Thumb,
  ThumbEditButton, HiddenFile,
  Fields, Field, Label, Input, InputRow, UnitBadge,
  SelectWrap, ColorDot, Select,
  ChipRow, Chip, Footer, Secondary, Primary
} from "./MenuEdit.styles";

import editIcon from "../assets/images/edit.png";
import amerIceImg from "../assets/images/americano-ice.png";

/**
 * 모달로 뜨는 메뉴 설정 창
 * props:
 *  - open: boolean
 *  - product: { id, name, price, type, popular, sectionId, image?, _isNew? }
 *  - sections: [{id,title}]
 *  - onClose(): void
 *  - onSave(updated): void
 */
export default function MenuEdit({ open, product, sections = [], onClose, onSave }) {
  const initialSection = useMemo(() => sections?.[0]?.id ?? "", [sections]);

  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  /* 폼 상태 */
  const [form, setForm] = useState(() => ({
    name: product?.name ?? "",
    price: product?.price ?? 0,
    type: product?.type ?? "coffee",
    popular: !!product?.popular,
    // ✅ 신규 추가 시 product.sectionId를 우선 사용
    sectionId: product?.sectionId ?? initialSection,
    tags: new Set(product?.popular ? ["인기"] : []),
    options: new Set(
      (product?.id || "").includes("ice") ? ["아이스"]
      : (product?.id || "").includes("hot") ? ["핫"]
      : []
    ),
  }));

  /* 기본 이미지 로딩 */
  useEffect(() => {
    const isIceAmericano =
      (product?.id || "").includes("americano-ice") ||
      (product?.name || "").replace(/\s/g, "") === "아이스아메리카노";

    if (product?.image) {
      setImageUrl(product.image);
      setImageFile(null);
    } else if (isIceAmericano) {
      setImageUrl(amerIceImg);
      setImageFile(null);
    } else {
      setImageUrl("");
      setImageFile(null);
    }

    setForm({
      name: product?.name ?? "",
      price: product?.price ?? 0,
      type: product?.type ?? "coffee",
      popular: !!product?.popular,
      // ✅ 여기서도 product.sectionId 우선
      sectionId: product?.sectionId ?? initialSection,
      tags: new Set(product?.popular ? ["인기"] : []),
      options: new Set(
        (product?.id || "").includes("ice") ? ["아이스"]
        : (product?.id || "").includes("hot") ? ["핫"]
        : []
      ),
    });
  }, [product, initialSection]);

  if (!open) return null;

  const setVal = (k) => (e) => {
    const v = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: k === "price" ? Number(v) || 0 : v }));
  };

  const toggleSet = (key, value) => {
    setForm((f) => {
      const next = new Set(f[key]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...f, [key]: next };
    });
  };

  const openPicker = () => fileRef.current?.click();

  const onPickFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImageFile(file);
  };

  const handleSave = () => {
    const payload = {
      ...product,
      _isNew: product?._isNew || !product?.id,  // ✅ 신규 여부 유지
      name: form.name,
      price: form.price,
      type: form.type,
      popular: form.popular || form.tags.has("인기"),
      sectionId: form.sectionId,
      tags: Array.from(form.tags),
      options: Array.from(form.options),
      image: imageUrl || null,
      imageFile: imageFile || null,
    };
    onSave?.(payload);
  };

  const COLOR_MAP = {
    americano: "#7bd35f",
    latte: "#f1b94b",
    sweet: "#f08bb0",
    ade: "#5bbdf6",
    cake: "#a98df8",
  };
  const colorFor = (id) => COLOR_MAP[id] || "#7bd35f";

  return (
    <Overlay role="dialog" aria-modal="true">
      <Dialog>
        <Header>
          <HeaderBar />
          <Title>{product?._isNew || !product?.id ? "새 메뉴 추가" : "메뉴 설정"}</Title>
        </Header>

        <Body>
          <LeftCol>
            <Label>대표 이미지</Label>
            <Thumb>
              {imageUrl ? <img src={imageUrl} alt="" /> : null}
              <ThumbEditButton type="button" onClick={openPicker} aria-label="이미지 변경">
                <img src={editIcon} alt="" aria-hidden />
              </ThumbEditButton>
              <HiddenFile ref={fileRef} onChange={onPickFile} />
            </Thumb>
          </LeftCol>

          <Fields>
            <Field className="field-name">
              <Label>메뉴 이름</Label>
              <Input
                value={form.name}
                onChange={setVal("name")}
                placeholder="이름을 입력하세요"
              />
            </Field>

            <Field className="field-price">
              <Label>가격</Label>
              <InputRow>
                <Input
                  className="price"
                  type="number"
                  min={0}
                  value={form.price}
                  onChange={setVal("price")}
                />
                <UnitBadge>원</UnitBadge>
              </InputRow>
            </Field>

            <Field className="field-color">
              <Label>색상 주문 표시</Label>
              <SelectWrap>
                <ColorDot $color={colorFor(form.sectionId)} />
                <Select value={form.sectionId} onChange={setVal("sectionId")}>
                  {sections.map((s) => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </Select>
              </SelectWrap>
            </Field>

            <Field className="field-tags">
              <Label>태그</Label>
              <ChipRow>
                {["인기","달달","HOT"].map((t) => (
                  <Chip key={t} $active={form.tags.has(t)} onClick={() => toggleSet("tags", t)}>
                    {t}
                  </Chip>
                ))}
                <Chip className="ghost" onClick={() => toggleSet("tags", "추가")}>＋</Chip>
              </ChipRow>
            </Field>

            <Field className="field-options">
              <Label>옵션</Label>
              <ChipRow>
                {["아이스","핫"].map((o) => (
                  <Chip key={o} $active={form.options.has(o)} onClick={() => toggleSet("options", o)}>
                    {o}
                  </Chip>
                ))}
                <Chip className="ghost" onClick={() => toggleSet("options", "기타")}>＋</Chip>
              </ChipRow>
            </Field>
          </Fields>
        </Body>

        <Footer>
          <Secondary onClick={onClose}>취소</Secondary>
          <Primary onClick={handleSave}>저장</Primary>
        </Footer>
      </Dialog>
    </Overlay>
  );
}
