export async function captureScreenshot(elementId: string): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    // html2canvas를 동적으로 import
    let html2canvas;
    try {
      html2canvas = (await import("html2canvas")).default;
    } catch (importError) {
      alert(
        "스크린샷 기능을 사용하려면 html2canvas를 설치해주세요.\n\n터미널에서 실행: npm install html2canvas"
      );
      return;
    }

    const element = document.getElementById(elementId);

    if (!element) {
      alert("캡처할 요소를 찾을 수 없습니다.");
      return;
    }

    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      logging: false,
    });

    // 이미지로 변환
    canvas.toBlob((blob) => {
      if (!blob) {
        alert("이미지 생성에 실패했습니다.");
        return;
      }

      // 다운로드 링크 생성
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `운명뽑기_${new Date().getTime()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  } catch (error) {
    console.error("스크린샷 생성 실패:", error);
    alert("스크린샷 생성에 실패했습니다.");
  }
}

