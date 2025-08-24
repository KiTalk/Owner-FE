// src/data/TouchOrderGrouped.data.js
export const MENU_DATA = [
  {
    id: "all",
    label: "모든 메뉴",
    sections: [
      {
        id: "americano",
        title: "아메리카노",
        products: [
          { id: "americano-ice", name: "아이스 아메리카노", price: 2500, popular: true, type: "coffee" },
          { id: "americano-hot", name: "핫 아메리카노",    price: 4000, popular: true, type: "coffee" },
        ],
      },
      {
        id: "latte",
        title: "라떼",
        products: [
          { id: "latte-ice",           name: "아이스 카페라떼",  price: 4000, popular: true, type: "coffee" },
          { id: "latte-hot",           name: "핫 카페라떼",      price: 4000, popular: true, type: "coffee" },
          { id: "vanilla-latte-ice",   name: "바닐라 라떼",      price: 5000, popular: true, type: "coffee" },
        ],
      },
      {
        id: "sweet",
        title: "달달한 커피",
        products: [
          { id: "chocolate-mocha",         name: "초콜릿 모카",        price: 5500, popular: true, type: "coffee" },
          { id: "caramel-macchiato-ice",   name: "카라멜 마끼아또",    price: 5500, popular: true, type: "coffee" },
        ],
      },
      // 필요하면 차/음료/디저트도 같은 구조로 섹션 + type 지정해서 추가
      // {
      //   id: "tea-basic",
      //   title: "홍차",
      //   products: [
      //     { id: "black-tea-01", name: "얼그레이", price: 4500, popular: false, type: "tea" },
      //   ],
      // },
    ],
  },
];
