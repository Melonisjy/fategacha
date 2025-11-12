"use client";

import { Fortune } from "@/lib/fortuneData";
import { formatFortuneText } from "@/lib/getFortune";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <CelebrationAnimation
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
      <div className="w-full max-w-[420px] mx-auto relative" ref={cardRef}>
        <ParticleEffect />
        <motion.div
          className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-lg relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={itemVariants}
              className="text-white text-2xl font-bold text-center mb-8 drop-shadow-lg"
            >
              {name}님의 2026 운명
            </motion.h2>

            {/* 날짜/시간 섹션 - 작고 세련되게 */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="flex items-center gap-2 text-purple-200/80">
                <span className="text-sm">📅</span>
                <span className="text-sm font-medium">
                  2026년 {fortune.month} {fortune.day}일
                </span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2 text-purple-200/80">
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
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="text-white/50 text-lg">✨</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </motion.div>

            {/* 결과 문장 - 크고 강조 */}
            <motion.div
              variants={itemVariants}
              className="mt-6 pt-8 pb-8 px-6 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl border border-white/25 shadow-xl"
            >
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed drop-shadow-lg text-center">
                {fortune.event}
              </p>
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
