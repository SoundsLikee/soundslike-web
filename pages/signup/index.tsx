import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Layout, Button, Input } from "@/components/common";

import { words as constWords } from "@/constants";
import { AuthService } from "@/services";
import { message } from "antd";

function PasswordPhase({ onSubmit }: { onSubmit: (password: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const create = () => {
    if (!password || !confirmPassword || password !== confirmPassword) {
      alert("올바르게 입력해주세요");
      return;
    }

    onSubmit(password);
  };

  return (
    <Wrapper>
      <Title style={{ marginBottom: "5.6rem" }}>신규 등록</Title>
      <StyledInput
        label="ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledInput
        type="password"
        label="새 비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledInput
        type="password"
        label="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button href="/main" onClick={() => message.success("가입되었어요 😉")}>
        생성
      </Button>
    </Wrapper>
  );
}

function ShowRecoveryPhrasePhase({
  onComplete,
}: {
  onComplete: (phrase: string) => void;
}) {
  const [words] = useState(
    constWords.sort(() => Math.random() - 0.5).slice(0, 16)
  );

  return (
    <>
      <OctoImg src="/images/octo/recovery_show.png" />
      <Title>비밀 복구 구문</Title>
      <WarningText>
        경고: 이 구문은 누구와도 공유하지 마세요!
        <br />이 구문은 계정 전체를 도용하는 데 사용될 수 있습니다
      </WarningText>
      <WordsWrapper>
        {words.map((word) => (
          <WordCard key={word}>{word}</WordCard>
        ))}
      </WordsWrapper>
      <Button onClick={() => onComplete(words.join(" "))} width={360}>
        완료
      </Button>
    </>
  );
}

const phases = ["password", "show"] as const;
type Phase = typeof phases[number];
export default function SignupPage() {
  const [phase, setPhase] = useState<Phase>("password");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signUp = (phrase: string) => {
    try {
      router.replace("/signup/complete");
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Layout height={640}>
      <PasswordPhase onSubmit={signUp} />
    </Layout>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 36rem;
`;

const OctoImg = styled.img`
  position: absolute;
  top: -8.8rem;

  width: 30rem;
`;

const Title = styled.h1`
  margin-top: 5.6rem;
  margin-bottom: 1.6rem;

  font-size: 3.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray1};
`;

const WarningText = styled.p`
  margin-bottom: 2.4rem;

  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red};
`;

const StyledInput = styled(Input)`
  margin-bottom: 2rem;
`;

const WordsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 1.6rem 2.4rem 0;
  margin-bottom: 2rem;

  background-color: ${({ theme }) => theme.colors.gray8};

  border-radius: 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.gray6};
`;

const WordCard = styled.div`
  width: 25%;
  margin-bottom: 1.6rem;

  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.gray2};
`;
