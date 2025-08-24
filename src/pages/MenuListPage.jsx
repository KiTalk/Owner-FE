import React, { useEffect, useMemo, useState } from "react";
import {
  Page, Header, Tabs, Tab,
  Grid, EmptyState, LogoContainer, LogoImage,
  HeaderIcon, HeaderCenter, HeaderLeft, HeaderRight
} from "./MenuListPage.styles";
import { useNavigate } from "react-router-dom";
import logoImage from "../assets/images/logo.png";
import backIcon from "../assets/images/back.png";
import homeIcon from "../assets/images/home.png";
import OrderCard from "../components/OrderCard.jsx";

/** 더미 API (실제 연동 시 여기만 교체하면 됨) */
function fetchOrdersMock() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "o-1",
          orderNo: "No. 1",
          packType: "포장",
          items: [
            { name: "아메리카노 (ice)", qty: 1 },
            { name: "아메리카노 (hot)", qty: 1 },
            { name: "카페라떼 (ice)", qty: 1 },
            { name: "바닐라라떼 (ice)", qty: 1 },
          ],
          total: 17000,
          status: "pending",
        },
        {
          id: "o-2",
          orderNo: "No. 1",
          packType: "포장",
          items: [
            { name: "아메리카노 (ice)", qty: 1 },
            { name: "아메리카노 (hot)", qty: 1 },
            { name: "카페라떼 (ice)", qty: 1 },
            { name: "바닐라라떼 (ice)", qty: 1 },
          ],
          total: 17000,
          status: "pending",
        },
        {
          id: "o-3",
          orderNo: "No. 1",
          packType: "포장",
          items: [
            { name: "아메리카노 (ice)", qty: 1 },
            { name: "아메리카노 (hot)", qty: 1 },
            { name: "카페라떼 (ice)", qty: 1 },
            { name: "바닐라라떼 (ice)", qty: 1 },
          ],
          total: 17000,
          status: "pending",
        },
      ]);
    }, 300);
  });
}

export default function MenuListPage() {
  const [activeTab, setActiveTab] = useState("pending"); // 'pending' | 'done'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchOrdersMock().then((data) => {
      if (mounted) {
        setOrders(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  const pendingOrders = useMemo(
    () => orders.filter(o => o.status === "pending"),
    [orders]
  );
  const doneOrders = useMemo(
    () => orders.filter(o => o.status === "done"),
    [orders]
  );

  const moveToDone = (id) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: "done" } : o)));
    setActiveTab("done"); // 완료 탭으로 전환
  };

  const moveToPending = (id) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...o, status: "pending" } : o)));
    setActiveTab("pending");
  };

  const list = activeTab === "pending" ? pendingOrders : doneOrders;

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <HeaderIcon
            src={backIcon}
            alt="뒤로가기"
            onClick={() => navigate("/order")}
          />
        </HeaderLeft>

        <HeaderCenter>
          <Tabs role="tablist" aria-label="주문 상태 전환">
          <Tab
            role="tab"
            aria-selected={activeTab === "pending"}
            $active={activeTab === "pending"}
            onClick={() => setActiveTab("pending")}
          >
            주문
          </Tab>
          <span className="divider">|</span>
          <Tab
            role="tab"
            aria-selected={activeTab === "done"}
            $active={activeTab === "done"}
            onClick={() => setActiveTab("done")}
          >
            완료
          </Tab>
          </Tabs>
        </HeaderCenter>

        <HeaderRight>
          <HeaderIcon
            src={homeIcon}
            alt="홈"
            onClick={() => navigate("/")}
          />
        </HeaderRight>        
      </Header>      

      {loading ? (
        <EmptyState>불러오는 중…</EmptyState>
      ) : list.length === 0 ? (
        <EmptyState>
          {activeTab === "pending" ? "대기 중인 주문이 없습니다." : "완료된 주문이 없습니다."}
        </EmptyState>
      ) : (
        <Grid>
          {list.map((o) => (
            <OrderCard
              key={o.id}
              order={o}
              isPending={activeTab === "pending"}
              onDone={moveToDone}
              onBack={moveToPending}
            />
          ))}
        </Grid>
      )}

      <LogoContainer>
        <LogoImage src={logoImage} alt="KiTalk 로고" />
      </LogoContainer>
    </Page>
  );
}
