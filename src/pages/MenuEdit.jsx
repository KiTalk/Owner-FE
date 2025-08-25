import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Overlay, Dialog, Header, HeaderBar, Title,
  Body, LeftCol, RightCol, Thumb,
  ThumbEditButton, HiddenFile,
  Field, Label, Input, InputRow, UnitBadge,
  SelectWrap, ColorDot, Select,
  ChipRow, Chip, ChipGhost,
  TagOptionRow, TagOptionBlock, PnCRow,
  Footer, Secondary, Primary
} from "./MenuEdit.styles";

import { createPortal } from "react-dom";
import editIcon from "../assets/images/edit.png";
import amerIceImg from "../assets/images/americano-ice.png";

export default function MenuEdit({ open, product, sections = [], onClose, onSave }) {
  const initialSection = useMemo(() => sections?.[0]?.id ?? "", [sections]);

  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // 초기 form (options 기본값 포함)
  const [form, setForm] = useState(() => ({
    name: product?.name ?? "",
    price: product?.price ?? 0,
    type: product?.type ?? "coffee",
    sectionId: product?.sectionId ?? initialSection,
    tags: new Set(
      Array.isArray(product?.tags) ? product.tags
      : product?.popular ? ["인기"] : []
    ),
    options: new Set(), // ✅ 첫 렌더 보호
  }));

  // 이미지/폼 초기화
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
      sectionId: product?.sectionId ?? initialSection,
      tags: new Set(
        Array.isArray(product?.tags) ? product.tags
        : product?.popular ? ["인기"] : []
      ),
      options: new Set(
        (product?.id || "").includes("ice") ? ["아이스"]
        : (product?.id || "").includes("hot") ? ["핫"]
        : []
      ),
    });
  }, [product, initialSection]);

  // ✅ 모달 열릴 때 바디 스크롤 잠금 + 스크롤바 폭 보정
  useEffect(() => {
    if (!open) return;
    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPaddingRight = style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    style.overflow = "hidden";
    if (scrollbarWidth > 0) style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      style.overflow = prevOverflow;
      style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  if (!open) return null;

  const setVal = (k) => (e) => {
    const v = e?.target?.value;
    setForm((f) => ({ ...f, [k]: k === "price" ? (Number(v) || 0) : v }));
  };

  const toggleSet = (key, value) => {
    setForm((f) => {
      const prev = f[key];
      const next = prev instanceof Set ? new Set(prev) : new Set();
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

  // 저장
  const handleSave = () => {
    if (!form.name.trim() && (!form.price || form.price === 0)) {
      onSave?.({ ...product, _delete: true });
      return;
    }

    const payload = {
      ...product,
      _isNew: product?._isNew || !product?.id,
      name: form.name,
      price: form.price,
      type: form.type,
      sectionId: form.sectionId,
      tags: Array.from(form.tags),
      options: Array.from(form.options ?? []),
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

  return createPortal(
    <Overlay role="dialog" aria-modal="true">
      <Dialog>
        <Header>
          <HeaderBar />
          <Title>{product?._isNew || !product?.id ? "새 메뉴 추가" : "메뉴 설정"}</Title>
        </Header>

        {/* 상단 1줄: (좌) 대표 이미지 + (우) RightCol(이름 + PnC 한 줄) */}
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

          <RightCol>
            {/* 메뉴 이름 */}
            <Field className="field-name">
              <Label>메뉴 이름</Label>
              <Input
                className="name"
                value={form.name}
                onChange={setVal("name")}
                placeholder="이름을 입력하세요"
              />
            </Field>

            {/* PnC: 가격 + 색상주문표시 한 줄 */}
            <PnCRow>
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
                    {(sections || []).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </Select>
                </SelectWrap>
              </Field>
            </PnCRow>
          </RightCol>

          {/* 다음 줄 전체폭: 태그 + 옵션 */}
          <TagOptionRow>
            <TagOptionBlock>
              <Label>태그</Label>
              <ChipRow>
                <Chip
                  $active={form.tags.has("인기")}
                  onClick={() => toggleSet("tags", "인기")}
                >
                  인기
                </Chip>
              </ChipRow>
            </TagOptionBlock>

            <TagOptionBlock>
              <Label>옵션</Label>
              <ChipRow>
                <Chip
                  $active={form.options?.has("아이스")}
                  onClick={() => toggleSet("options", "아이스")}
                >
                  아이스
                </Chip>
                <Chip
                  $active={form.options?.has("핫")}
                  onClick={() => toggleSet("options", "핫")}
                >
                  핫
                </Chip>
                <ChipGhost
                  onClick={() => toggleSet("options", "기타")}
                  aria-label="옵션 추가"
                />
              </ChipRow>
            </TagOptionBlock>
          </TagOptionRow>
        </Body>

        <Footer>
          <Secondary onClick={onClose}>취소</Secondary>
          <Primary onClick={handleSave}>저장</Primary>
        </Footer>
      </Dialog>
    </Overlay>,
    document.body
  );
}
