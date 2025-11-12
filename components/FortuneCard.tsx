"use client";

import { Fortune } from "@/lib/fortuneData";
import { formatFortuneText } from "@/lib/getFortune";
import { gradeConfigs } from "@/lib/fortuneGrade";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const gradeConfig = gradeConfigs[fortune.grade];

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
      case 'divine':
        return {
          initial: { opacity: 0, scale: 0.8, rotateY: -180 },
          animate: { 
            opacity: 1, 
            scale: 1, 
            rotateY: 0,
            boxShadow: [
              '0 0 0px rgba(251,191,36,0)',
              '0 0 40px rgba(251,191,36,0.6)',
              '0 0 20px rgba(251,191,36,0.4)',
            ],
          },
          transition: { 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          },
        }
      case 'special':
        return {
          initial: { opacity: 0, scale: 0.9, y: 30 },
          animate: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            boxShadow: [
              '0 0 0px rgba(244,114,182,0)',
              '0 0 30px rgba(244,114,182,0.5)',
              '0 0 15px rgba(244,114,182,0.3)',
            ],
          },
          transition: { 
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        }
      default:
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
        }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: fortune.grade === 'divine' ? 0.2 : 0.3,
        delayChildren: fortune.grade === 'divine' ? 0.4 : 0.2,
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
        duration: fortune.grade === 'divine' ? 0.8 : 0.6,
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
        <ParticleEffect count={gradeConfig.particleCount} grade={fortune.grade} />
        <motion.div
          className={`backdrop-blur-md rounded-2xl p-8 border-2 ${gradeConfig.borderColor} ${gradeConfig.glowColor} relative z-10 bg-gradient-to-br ${gradeConfig.bgGradient}`}
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
                <div className="font-bold text-yellow-300 mb-2">등급별 확률</div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">✨ 신의 예언</span>
                  <span className="font-semibold">5%</span>
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
            {/* 등급 배지 */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center mb-4"
            >
              <motion.div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border ${gradeConfig.borderColor}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: fortune.grade === 'divine' ? 0.6 : 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <span className="text-xl">{gradeConfig.icon}</span>
                <span className={`${gradeConfig.color} font-bold text-sm`}>
                  {gradeConfig.name}
                </span>
              </motion.div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className={`${gradeConfig.color} text-2xl font-bold text-center mb-8 drop-shadow-lg`}
            >
              {name}님의 2026 운명
            </motion.h2>

            {/* 날짜/시간 섹션 - 작고 세련되게 */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className={`flex items-center gap-2 ${gradeConfig.color}/80`}>
                <span className="text-sm">📅</span>
                <span className="text-sm font-medium">
                  2026년 {fortune.month} {fortune.day}일
                </span>
              </div>
              <div className={`w-px h-4 ${gradeConfig.color}/30`}></div>
              <div className={`flex items-center gap-2 ${gradeConfig.color}/80`}>
                <span className="text-sm">🕐</span>
                <span className="text-sm font-medium">
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
              {fortune.grade === 'divine' ? (
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
              ) : fortune.grade === 'special' ? (
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

            {/* 결과 문장 - 크고 강조 */}
            <motion.div
              variants={itemVariants}
              className={`mt-6 pt-8 pb-8 px-6 bg-gradient-to-br ${gradeConfig.bgGradient} backdrop-blur-sm rounded-2xl border ${gradeConfig.borderColor} ${gradeConfig.glowColor}`}
            >
              <motion.p 
                className={`${gradeConfig.color} text-2xl md:text-3xl font-bold leading-relaxed drop-shadow-lg text-center`}
                animate={fortune.grade === 'divine' ? {
                  textShadow: [
                    '0 0 10px rgba(251,191,36,0.5)',
                    '0 0 20px rgba(251,191,36,0.8)',
                    '0 0 10px rgba(251,191,36,0.5)',
                  ],
                } : {}}
                transition={fortune.grade === 'divine' ? {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                } : {}}
              >
                {fortune.event}
              </motion.p>
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
            className="w-full px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white font-semibold text-lg shadow-lg hover:bg-white/30 hover:scale-105 active:scale-95 transition-all"
          >
            🔮 다시 보기
          </RippleButton>
        </motion.div>
      </div>
    </>
  );
}
