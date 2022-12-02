import axios from "axios";

class TransactionService {
  async analyze(mediaUrl: string) {
    const blob = await fetch(mediaUrl).then((r) => r.blob());
    const audioFile = new File([blob], "voice.wav", { type: "audio/wav" });

    const formData = new FormData(); // preparing to send to the server

    formData.append("file", audioFile); // preparing to send to the server

    // @TODO: 전송
    // axios.post("http://localhost:8080/asr/", formData, {
    //   headers: { "content-type": "multipart/form-data" },
    // });

    // 응답 mocking 코드 (5초 대기)
    await new Promise((resolve) => setTimeout(resolve, 5000));
    if (Math.random() < 0.5) {
      /** 50% 확률로 NotFound 에러 */
      throw new Error();
    } else {
      return true;
    }
  }
}

export default new TransactionService();
