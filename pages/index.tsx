import styled from "styled-components";

import { Layout, Button } from "@/components/common";

export default function HomePage() {
  return (
    <Layout>
      <Title>SoundsLike</Title>
      <Description>
        남녀유아 목소리를 구분하고
        <br />
        목소리의 주인공을 판별해줍니다.
      </Description>
      <Row>
        <Button href="/signup" width={288}>
          신규 등록
        </Button>
        <Button href="/recovery" width={288}>
          로그인
        </Button>
      </Row>
    </Layout>
  );
}

const Title = styled.h1`
  margin-top: 8rem;
  margin-bottom: 2.4rem;

  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray1};
`;

const Description = styled.p`
  margin-bottom: 4.8rem;

  text-align: center;

  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.gray4};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  margin-top: auto;
`;
