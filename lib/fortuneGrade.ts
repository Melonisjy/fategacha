import { FortuneGrade } from "./fortuneData";

export interface GradeConfig {
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  particleCount: number;
  dividerColor: string;
  textColor: string;
  shadowColor: string; // 등급별 그림자 색상
  shadowLayers: string; // 다중 레이어 그림자
}

export const gradeConfigs: Record<FortuneGrade, GradeConfig> = {
  legendary: {
    name: "전설의 예언",
    icon: "💎",
    color: "text-cyan-300",
    textColor: "cyan-300",
    bgGradient:
      "from-cyan-400/40 via-blue-400/30 via-purple-400/30 to-pink-400/40",
    borderColor: "border-cyan-300/60",
    glowColor:
      "shadow-[0_0_50px_rgba(34,211,238,0.8),0_0_100px_rgba(147,51,234,0.6)]",
    dividerColor: "cyan-300",
    particleCount: 50,
    shadowColor: "rgba(34,211,238,0.4)",
    shadowLayers:
      "0 0 0 0 rgba(34,211,238,0), 0 4px 6px -1px rgba(34,211,238,0.3), 0 10px 15px -3px rgba(147,51,234,0.4), 0 20px 25px -5px rgba(34,211,238,0.2), 0 0 50px rgba(34,211,238,0.3), 0 0 100px rgba(147,51,234,0.2)",
  },
  divine: {
    name: "신의 예언",
    icon: "✨",
    color: "text-yellow-300",
    textColor: "yellow-300",
    bgGradient: "from-yellow-400/30 via-amber-400/20 to-orange-400/30",
    borderColor: "border-yellow-300/50",
    glowColor: "shadow-[0_0_30px_rgba(251,191,36,0.5)]",
    dividerColor: "yellow-300",
    particleCount: 30,
    shadowColor: "rgba(251,191,36,0.35)",
    shadowLayers:
      "0 0 0 0 rgba(251,191,36,0), 0 4px 6px -1px rgba(251,191,36,0.25), 0 10px 15px -3px rgba(245,158,11,0.3), 0 20px 25px -5px rgba(251,191,36,0.2), 0 0 40px rgba(251,191,36,0.25), 0 0 80px rgba(245,158,11,0.15)",
  },
  special: {
    name: "특별한 예언",
    icon: "⭐",
    color: "text-pink-300",
    textColor: "pink-300",
    bgGradient: "from-pink-400/30 via-purple-400/20 to-indigo-400/30",
    borderColor: "border-pink-300/50",
    glowColor: "shadow-[0_0_20px_rgba(244,114,182,0.4)]",
    dividerColor: "pink-300",
    particleCount: 20,
    shadowColor: "rgba(244,114,182,0.3)",
    shadowLayers:
      "0 0 0 0 rgba(244,114,182,0), 0 4px 6px -1px rgba(244,114,182,0.2), 0 10px 15px -3px rgba(236,72,153,0.25), 0 20px 25px -5px rgba(244,114,182,0.15), 0 0 30px rgba(244,114,182,0.2), 0 0 60px rgba(236,72,153,0.1)",
  },
  normal: {
    name: "평범한 예언",
    icon: "💫",
    color: "text-purple-200",
    textColor: "purple-200",
    bgGradient: "from-purple-400/20 via-blue-400/15 to-indigo-400/20",
    borderColor: "border-white/30",
    glowColor: "shadow-[0_0_10px_rgba(255,255,255,0.2)]",
    dividerColor: "white",
    particleCount: 10,
    shadowColor: "rgba(192,132,252,0.25)",
    shadowLayers:
      "0 0 0 0 rgba(192,132,252,0), 0 4px 6px -1px rgba(192,132,252,0.15), 0 10px 15px -3px rgba(139,92,246,0.2), 0 20px 25px -5px rgba(192,132,252,0.1), 0 0 20px rgba(192,132,252,0.15), 0 0 40px rgba(139,92,246,0.08)",
  },
};
