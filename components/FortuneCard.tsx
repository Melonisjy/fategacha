"use client";

import { Fortune } from "@/lib/fortuneData";
import { formatFortuneText } from "@/lib/getFortune";
import { gradeConfigs } from "@/lib/fortuneGrade";
import { events } from "@/lib/fortuneData";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "./RippleButton";
import ParticleEffect from "./ParticleEffect";
import ShareButtons from "./ShareButtons";
import CelebrationAnimation from "./CelebrationAnimation";
import { captureScreenshot } from "@/lib/screenshot";

interface FortuneCardProps {
  name: string;
  fortune: Fortune;
}

export default function FortuneCard({ name, fortune }: FortuneCardProps) {
  const router = useRouter();
  const [showCelebration, setShowCelebration] = useState(false);
  const [slotMachineText, setSlotMachineText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const gradeConfig = gradeConfigs[fortune.grade];

  // 슬롯머신 효과
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    // 슬롯머신 효과 시작
    let currentIndex = 0;
    interval = setInterval(
      () => {
        // 랜덤하게 텍스트 변경
        const randomIndex = Math.floor(Math.random() * events.length);
        setSlotMachineText(events[randomIndex].text);
        currentIndex++;

        // 일정 횟수 후 실제 결과로 변경
        const maxIterations =
          fortune.grade === "legendary"
            ? 20
            : fortune.grade === "divine"
            ? 15
            : fortune.grade === "special"
            ? 10
            : 5;
        if (currentIndex > maxIterations) {
          if (interval) clearInterval(interval);
          setSlotMachineText(fortune.event);
          setShowContent(true);
        }
      },
      fortune.grade === "legendary"
        ? 80
        : fortune.grade === "divine"
        ? 100
        : fortune.grade === "special"
        ? 120
        : 150
    );

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [fortune.event, fortune.grade]);

  const handleShare = (platform: string) => {
    setShowCelebration(true);
  };

  const handleScreenshot = async () => {
    if (cardRef.current) {
      // 임시로 ID 추가
      const tempId = "fortune-card-screenshot";
      cardRef.current.id = tempId;
      await captureScreenshot(tempId);
      cardRef.current.id = "";
    }
  };

  // 등급별 애니메이션 설정
  const getCardAnimation = () => {
    switch (fortune.grade) {
      case "legendary":
        return {
          initial: { opacity: 0, scale: 0.5, rotateY: -360, rotateZ: -180 },
          animate: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateZ: 0,
            boxShadow: [
              "0 0 0px rgba(34,211,238,0)",
              "0 0 60px rgba(34,211,238,0.8)",
              "0 0 100px rgba(147,51,234,0.6)",
              "0 0 50px rgba(34,211,238,0.8)",
            ],
          },
          transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          },
        };
      case "divine":
        return {
          initial: { opacity: 0, scale: 0.8, rotateY: -180 },
          animate: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            boxShadow: [
              "0 0 0px rgba(251,191,36,0)",
              "0 0 40px rgba(251,191,36,0.6)",
              "0 0 20px rgba(251,191,36,0.4)",
            ],
          },
          transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        };
      case "special":
        return {
          initial: { opacity: 0, scale: 0.9, y: 30 },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            boxShadow: [
              "0 0 0px rgba(244,114,182,0)",
              "0 0 30px rgba(244,114,182,0.5)",
              "0 0 15px rgba(244,114,182,0.3)",
            ],
          },
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        };
      default:
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
        };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren:
          fortune.grade === "legendary"
            ? 0.15
            : fortune.grade === "divine"
            ? 0.2
            : 0.3,
        delayChildren:
          fortune.grade === "legendary"
            ? 0.6
            : fortune.grade === "divine"
            ? 0.4
            : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration:
          fortune.grade === "legendary"
            ? 1.0
            : fortune.grade === "divine"
            ? 0.8
            : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const cardAnimation = getCardAnimation();

  return (
    <>
      <CelebrationAnimation
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
      <div className="w-full max-w-[420px] mx-auto relative" ref={cardRef}>
        <ParticleEffect
          count={gradeConfig.particleCount}
          grade={fortune.grade}
        />
        <motion.div
          className={`backdrop-blur-md rounded-3xl p-8 border-4 ${gradeConfig.borderColor} ${gradeConfig.glowColor} relative z-10 bg-gradient-to-br ${gradeConfig.bgGradient} dynamic-gradient neomorphic`}
          initial={cardAnimation.initial}
          animate={cardAnimation.animate}
          transition={cardAnimation.transition}
        >
          {/* 예언등급표 보기 - 카드 오른쪽 상단 */}
          <div className="absolute top-6 right-6 group">
            <button
              className="text-white/70 text-xs hover:text-white transition-colors cursor-help underline decoration-dotted underline-offset-2"
              aria-label="예언등급표 보기"
            >
              예언등급표 보기
            </button>
            {/* 툴팁 */}
            <div className="absolute top-full mt-2 right-0 w-48 p-3 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="text-white text-xs space-y-2">
                <div className="font-bold text-yellow-300 mb-2">
                  등급별 확률
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300">💎 전설의 예언</span>
                  <span className="font-semibold">0.000001%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">✨ 신의 예언</span>
                  <span className="font-semibold">4.999999%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-pink-300">⭐ 특별한 예언</span>
                  <span className="font-semibold">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-purple-200">💫 평범한 예언</span>
                  <span className="font-semibold">70%</span>
                </div>
              </div>
              {/* 화살표 */}
              <div className="absolute bottom-full right-4 mb-1 w-2 h-2 bg-black/90 border-r border-b border-white/20 rotate-45"></div>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 등급 배지 - 카드 상단 중앙, 더 눈에 띄게 */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center mb-6"
            >
              <motion.div
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/25 backdrop-blur-md border-2 ${gradeConfig.borderColor} shadow-lg`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay:
                    fortune.grade === "legendary"
                      ? 0.8
                      : fortune.grade === "divine"
                      ? 0.6
                      : 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <span className="text-2xl">{gradeConfig.icon}</span>
                <span className={`${gradeConfig.color} font-black text-base`}>
                  {gradeConfig.name}
                </span>
              </motion.div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className={`${gradeConfig.color} text-3xl md:text-4xl font-black text-center mb-6 tracking-tight brutal-text`}
            >
              {name}님의 2026 운명
            </motion.h2>

            {/* 날짜/시간 섹션 - 더 작고 세련되게 */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <div className="flex items-center gap-1.5 text-white/70">
                <span className="text-xs">📅</span>
                <span className="text-xs font-medium">
                  2026년 {fortune.month} {fortune.day}일
                </span>
              </div>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="flex items-center gap-1.5 text-white/70">
                <span className="text-xs">🕐</span>
                <span className="text-xs font-medium">
                  {fortune.hour.toString().padStart(2, "0")}시{" "}
                  {fortune.minute.toString().padStart(2, "0")}분
                </span>
              </div>
            </motion.div>

            {/* 구분선 */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-2 mb-8"
            >
              {fortune.grade === "legendary" ? (
                <>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>
                  <motion.div
                    className={`${gradeConfig.color} text-xl`}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.5, 1],
                      filter: [
                        "drop-shadow(0 0 10px rgba(34,211,238,0.8))",
                        "drop-shadow(0 0 20px rgba(147,51,234,0.8))",
                        "drop-shadow(0 0 10px rgba(34,211,238,0.8))",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {gradeConfig.icon}
                  </motion.div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"></div>
                </>
              ) : fortune.grade === "divine" ? (
                <>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"></div>
                  <motion.div
                    className={`${gradeConfig.color} text-lg`}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {gradeConfig.icon}
                  </motion.div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"></div>
                </>
              ) : fortune.grade === "special" ? (
                <>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300/30 to-transparent"></div>
                  <div className={`${gradeConfig.color} text-lg`}>
                    {gradeConfig.icon}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300/30 to-transparent"></div>
                </>
              ) : (
                <>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className={`${gradeConfig.color} text-lg`}>
                    {gradeConfig.icon}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </>
              )}
            </motion.div>

            {/* 결과 문장 - 크고 강조 (슬롯머신 효과) */}
            <motion.div
              variants={itemVariants}
              className={`mt-6 pt-10 pb-10 px-6 bg-gradient-to-br ${gradeConfig.bgGradient} backdrop-blur-sm rounded-3xl border-4 ${gradeConfig.borderColor} ${gradeConfig.glowColor} overflow-hidden dynamic-gradient-rotate neomorphic-inset relative`}
            >
              {/* 장식적 요소 - 별들 */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white/20"
                    style={{
                      left: `${(i * 12.5) % 100}%`,
                      top: `${(i * 15) % 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 0.5, 0.2],
                      scale: [0.8, 1.2, 0.8],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              {/* 장식적 라인 - 상단 */}
              <div className="absolute top-4 left-0 right-0 flex items-center justify-center gap-2 px-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <motion.div
                  className="text-white/30 text-xs"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ⭐
                </motion.div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              {/* 장식적 라인 - 하단 */}
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 px-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <motion.div
                  className="text-white/30 text-xs"
                  animate={{
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ✨
                </motion.div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={slotMachineText || fortune.event}
                  className={`${gradeConfig.color} text-[26px] font-black leading-relaxed text-center min-h-[120px] flex items-center justify-center tracking-tight relative z-10`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    textShadow:
                      showContent &&
                      (fortune.grade === "legendary" ||
                        fortune.grade === "divine")
                        ? fortune.grade === "legendary"
                          ? [
                              "0 0 15px rgba(34,211,238,0.8)",
                              "0 0 30px rgba(147,51,234,0.8)",
                              "0 0 15px rgba(34,211,238,0.8)",
                            ]
                          : [
                              "0 0 10px rgba(251,191,36,0.5)",
                              "0 0 20px rgba(251,191,36,0.8)",
                              "0 0 10px rgba(251,191,36,0.5)",
                            ]
                        : undefined,
                  }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.2,
                    textShadow:
                      showContent &&
                      (fortune.grade === "legendary" ||
                        fortune.grade === "divine")
                        ? {
                            duration: fortune.grade === "legendary" ? 1.5 : 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                        : undefined,
                  }}
                >
                  {slotMachineText || fortune.event}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 mt-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <ShareButtons
            text={formatFortuneText(name, fortune)}
            onShare={handleShare}
            onScreenshot={handleScreenshot}
          />
          <RippleButton
            onClick={() => router.push("/")}
            className="w-full px-8 py-5 rounded-2xl neomorphic-button text-white font-black text-xl tracking-wide hover:scale-105 active:scale-95 transition-all"
          >
            🔮 다시 보기
          </RippleButton>
        </motion.div>
      </div>
    </>
  );
}
