import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Layout, Button, Input } from "@/components/common";

import { AuthService } from "@/services";

export default function RecoveryPage() {
  const [phrase, setPhrase] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const requestRecovery = () => {
    if (
      !phrase ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      alert("올바르게 입력해주세요");
      return;
    }

    try {
      AuthService.recovery(phrase, password);
      router.replace("/recovery/complete");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Layout height={392}>
      <Wrapper>
        <Input
          label="E mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={requestRecovery}>로그인</Button>
      </Wrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 36rem;

  padding-top: 2.4rem;

  & > :not(:last-child) {
    margin-bottom: 2rem;
  }
`;

// @TODO: 진짜 textarea 태그로 변경하기
const Textarea = styled(Input)`
  height: 10rem;
`;
