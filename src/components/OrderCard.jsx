import React from "react";
import {
  Card,
  CardHeader,
  OrderNo,
  PackType,
  Items,
  ItemRow,
  BottomArea,
  Divider,
  Price,
  CTAButton,
} from "./OrderCard.styles";

/** 주문 카드 (프레젠테이션 컴포넌트) */
export default function OrderCard({ order, isPending, onDone, onBack }) {
  const formatPrice = (n) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 }) + "원";

  return (
    <Card>
      <CardHeader>
        <OrderNo>{order.orderNo}</OrderNo>
        <PackType>{order.packType}</PackType>
      </CardHeader>

      <Items>
        {order.items.map((it, idx) => (
          <ItemRow key={idx}>
            <span> • {it.name}</span>
            <span>{it.qty}</span>
          </ItemRow>
        ))}
      </Items>

      <BottomArea>
        <Divider />
        <Price>{formatPrice(order.total)}</Price>
        {isPending ? (
          <CTAButton onClick={() => onDone(order.id)}>완료</CTAButton>
        ) : (
          <CTAButton onClick={() => onBack(order.id)}>주문으로 이동</CTAButton>
        )}
      </BottomArea>
    </Card>
  );
}
