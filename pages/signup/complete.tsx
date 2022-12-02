import styled from "styled-components";

import { Layout, Button } from "@/components/common";
import { message } from "antd";

export default function SignupCompletePage() {
  return (
    <Layout>
      <Title>
        축하합니다!
        <br />
        계정 생성이 완료되었습니다
      </Title>
      <Button
        href="/main"
        onClick={() => message.success("가입되었어요 😉")}
        width={288}
      >
        모두 완료
      </Button>
    </Layout>
  );
}

const OctoImg = styled.img`
  position: absolute;
  top: -14.2rem;

  width: 45.2rem;
`;

const Title = styled.h1`
  margin-top: 13.6rem;
  margin-bottom: 1.6rem;

  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray1};
`;

const Tip = styled.p`
  margin-bottom: 1.2rem;

  font-size: 2rem;
  color: ${({ theme }) => theme.colors.gray3};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  margin-top: auto;
`;
