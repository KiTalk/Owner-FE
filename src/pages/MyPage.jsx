import styled from "styled-components";

const Page = styled.div`
  width: 1440px;
  height: 1024px;

`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 800;
`;

export default function MyPage() {
  return (
    <Page>
      <Title>못했어요 ㅠㅠㅠ</Title>
    </Page>
  );
}
