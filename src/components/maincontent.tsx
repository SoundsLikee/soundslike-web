import { TransactionService } from "@/services";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import styled from "styled-components";
import { Button, Layout } from "./common";

export default function MainContent() {
  const [isRecording, setRecording] = useState(false);
  const [isAnalyzing, setAnalyzing] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
      blobPropertyBag: { type: "audio/wav" },
    }
  );

  const getStatusText = () => {
    if (isRecording) {
      return <>음성을 기록중이에요 ...</>;
    }

    if (isSuccess) {
      return <>✅ 등록된 사용자입니다.</>;
    }
    if (isError) {
      return <>🚨 일치하는 사용자가 없습니다.</>;
    }

    if (isAnalyzing) {
      return (
        <>
          <Spin style={{ marginRight: "1.2rem" }} /> 음성을 분석중이에요 ...
          <Spin style={{ marginLeft: "1.2rem" }} />
        </>
      );
    }

    return "녹음을 시작해주세요";
  };

  useEffect(() => {
    if (!mediaBlobUrl || isAnalyzing) {
      return;
    }

    (async () => {
      try {
        setError(false);
        setSuccess(false);

        setAnalyzing(true);
        await TransactionService.analyze(mediaBlobUrl);
        setSuccess(true);
      } catch {
        setError(true);
      } finally {
        setAnalyzing(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaBlobUrl]);

  const handleButtonClick = async () => {
    if (isRecording) {
      stopRecording();
      setRecording(false);
    } else {
      startRecording();
      setRecording(true);
    }
  };

  return (
    <>
      <Layout height={540} style={{ padding: "3.2rem 0 0 0" }}>
        <Title>SoundsLike 시스템</Title>
        <div style={{ height: "4rem" }} />
        <Status>{getStatusText()}</Status>
        <div style={{ height: "4rem" }} />
        <ButtonRow>
          <Button size="small" onClick={handleButtonClick}>
            {isRecording ? "중지" : "녹음 시작"}
          </Button>
        </ButtonRow>
      </Layout>
    </>
  );
}

const Title = styled.p`
  margin-bottom: 1.2rem;

  font-size: 3.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray1};
`;

const Status = styled.p`
  margin-bottom: 1.6rem;

  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray5};
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;

  margin-bottom: 3.2rem;
`;
