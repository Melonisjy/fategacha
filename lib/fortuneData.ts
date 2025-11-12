export type FortuneGrade = "divine" | "special" | "normal";

export interface FortuneEvent {
  text: string;
  grade: FortuneGrade;
}

// 신의 예언 (5% 확률) - 매우 희귀
const divineEvents: string[] = [
  "인생의 전환점이 된다.",
  "오래된 꿈이 현실이 된다.",
  "인생의 방향이 바뀐다.",
  "오래된 상처가 치유된다.",
];

// 특별한 예언 (25% 확률) - 희귀
const specialEvents: string[] = [
  "뜻밖의 택배가 인생을 바꾼다.",
  "누군가의 고백을 듣게 된다.",
  "새로운 기회가 찾아온다.",
  "오래 기다리던 소식을 듣게 된다.",
  "뜻하지 않은 만남이 생긴다.",
  "중요한 사람과 다시 만난다.",
  "예상치 못한 도움을 받는다.",
  "새로운 가능성이 열린다.",
  "중요한 결정을 내리게 된다.",
  "중요한 약속을 하게 된다.",
];

// 평범한 예언 (70% 확률) - 일반
const normalEvents: string[] = [
  "잃어버린 물건이 돌아온다.",
  "복권을 샀다가 땅을 친다.",
  "SNS에서 예상치 못한 인연을 만난다.",
  "갑작스러운 여행 제안을 받는다.",
  "오래된 친구와 재회한다.",
  "새로운 취미를 발견한다.",
  "예상치 못한 상금을 받는다.",
  "옛날 사진을 발견한다.",
  "예상치 못한 연락을 받는다.",
  "새로운 맛집을 발견한다.",
  "우연히 옛날 친구를 만난다.",
  "비 오는 날 우산을 나눠쓴다.",
  "지하철에서 자리를 양보받는다.",
  "길에서 버스가 바로 온다.",
  "오래된 메시지를 발견한다.",
  "오래된 문제가 해결된다.",
  "새로운 시작을 하게 된다.",
  "예상치 못한 변화가 생긴다.",
  "중요한 선택의 기로에 선다.",
  "새로운 도전을 시작한다.",
  "오래된 갈등이 해소된다.",
];

export const events: FortuneEvent[] = [
  ...divineEvents.map((text) => ({ text, grade: "divine" as FortuneGrade })),
  ...specialEvents.map((text) => ({ text, grade: "special" as FortuneGrade })),
  ...normalEvents.map((text) => ({ text, grade: "normal" as FortuneGrade })),
];

export const items = [
  "양념치킨 한 조각",
  "파란 양말 한 짝",
  "지하철 3호선 티켓",
  "편의점 삼각김밥",
  "초코우유",
  "중고 노트북",
  "낡은 이어폰",
  "빨간 펜",
  "오래된 편지",
  "반짝이는 열쇠",
  "노란 우산",
  "초록색 마스크",
  "커피 한 잔",
  "빈 지갑",
  "오래된 스티커",
  "찢어진 영화표",
  "낡은 책갈피",
  "반짝이는 동전",
  "오래된 명함",
  "찢어진 사진",
  "빈 명함",
  "오래된 열쇠고리",
  "반짝이는 스티커",
  "낡은 지갑",
  "빈 봉투",
  "오래된 엽서",
  "찢어진 쪽지",
  "반짝이는 펜",
  "낡은 노트",
  "빈 상자",
  "오래된 액자",
  "찢어진 티켓",
  "반짝이는 구슬",
  "낡은 시계",
  "빈 병",
  "오래된 인형",
  "찢어진 종이",
  "반짝이는 돌",
  "낡은 가방",
  "빈 캔",
];

export const months = [
  { name: "1월", days: 31 },
  { name: "2월", days: 28 },
  { name: "3월", days: 31 },
  { name: "4월", days: 30 },
  { name: "5월", days: 31 },
  { name: "6월", days: 30 },
  { name: "7월", days: 31 },
  { name: "8월", days: 31 },
  { name: "9월", days: 30 },
  { name: "10월", days: 31 },
  { name: "11월", days: 30 },
  { name: "12월", days: 31 },
];

export const timePeriods = [
  "새벽",
  "이른 아침",
  "아침",
  "오전",
  "점심",
  "오후",
  "저녁",
  "밤",
  "한밤중",
];

export interface Fortune {
  month: string;
  day: number;
  hour: number;
  minute: number;
  timePeriod: string;
  event: string;
  item: string;
  grade: FortuneGrade;
}
