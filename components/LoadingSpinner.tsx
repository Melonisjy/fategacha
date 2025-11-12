"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingStage {
  message: string;
  emoji: string;
  duration: number;
  visualEffect: "stars" | "cards" | "crystal";
}

const loadingStages: LoadingStage[] = [
  {
    message: "운명을 읽는 중...",
    emoji: "✨",
    duration: 800,
    visualEffect: "stars",
  },
  {
    message: "과거를 분석 중...",
    emoji: "🔮",
    duration: 800,
    visualEffect: "cards",
  },
  {
    message: "미래를 예측 중...",
    emoji: "💎",
    duration: 800,
    visualEffect: "crystal",
  },
];

export default function LoadingSpinner() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cards, setCards] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    // 카드 덱 생성
    const cardDeck = ["✨", "⭐", "💫", "🌟", "🎯", "🔮", "🎲", "🎴"];
    setCards(cardDeck);

    // 카드를 빠르게 섞는 효과
    const shuffleInterval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardDeck.length);
    }, 150);

    // 별 생성 (운명을 읽는 중 단계용)
    const starCount = 15;
    const newStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setStars(newStars);

    // 단계별 진행
    let elapsedTime = 0;
    const totalDuration = loadingStages.reduce(
      (sum, stage) => sum + stage.duration,
      0
    );

    const progressInterval = setInterval(() => {
      elapsedTime += 50;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);

      // 단계 변경
      let accumulatedTime = 0;
      for (let i = 0; i < loadingStages.length; i++) {
        accumulatedTime += loadingStages[i].duration;
        if (elapsedTime < accumulatedTime) {
          setCurrentStage(i);
          break;
        }
      }
    }, 50);

    return () => {
      clearInterval(shuffleInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <motion.div
        className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center space-y-6">
          {/* 단계별 시각 효과 */}
          <div className="flex justify-center items-center relative h-40">
            <AnimatePresence mode="wait">
              {/* 별 효과 (운명을 읽는 중) */}
              {loadingStages[currentStage].visualEffect === "stars" && (
                <motion.div
                  key="stars"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-32 h-32">
                    {stars.map((star) => (
                      <motion.div
                        key={star.id}
                        className="absolute text-2xl"
                        style={{
                          left: `${star.x}%`,
                          top: `${star.y}%`,
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: star.id * 0.1,
                          ease: "easeInOut",
                        }}
                      >
                        ✨
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 카드 효과 (과거를 분석 중) */}
              {loadingStages[currentStage].visualEffect === "cards" && (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="relative w-32 h-40 perspective-1000">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotateY: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: {
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <div className="w-24 h-32 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-xl border-2 border-white/40 backdrop-blur-sm flex items-center justify-center text-4xl shadow-xl">
                        {cards[currentCard]}
                      </div>
                    </motion.div>
                    {[1, 2, 3].map((index) => (
                      <motion.div
                        key={index}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          transform: `translateZ(-${index * 10}px) scale(${
                            1 - index * 0.1
                          })`,
                          opacity: 0.3 - index * 0.1,
                        }}
                      >
                        <div className="w-24 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-xl border-2 border-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                          {cards[(currentCard + index) % cards.length]}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 크리스탈 효과 (미래를 예측 중) */}
              {loadingStages[currentStage].visualEffect === "crystal" && (
                <motion.div
                  key="crystal"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    className="text-6xl"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    💎
                  </motion.div>
                  {/* 크리스탈 주변 파티클 */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      animate={{
                        x: [
                          0,
                          Math.cos((i * Math.PI * 2) / 4) * 60,
                          Math.cos((i * Math.PI * 2) / 4) * 80,
                        ],
                        y: [
                          0,
                          Math.sin((i * Math.PI * 2) / 4) * 60,
                          Math.sin((i * Math.PI * 2) / 4) * 80,
                        ],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut",
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 단계별 메시지 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <motion.h3
                className="text-white text-xl font-bold flex items-center justify-center gap-2"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-2xl">
                  {loadingStages[currentStage].emoji}
                </span>
                {loadingStages[currentStage].message}
              </motion.h3>
            </motion.div>
          </AnimatePresence>

          {/* 진행률 바 */}
          <div className="space-y-2">
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden neomorphic-inset">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/60">
              {loadingStages.map((stage, index) => (
                <motion.span
                  key={index}
                  className={
                    index === currentStage ? "text-white font-bold" : ""
                  }
                >
                  {index + 1}
                </motion.span>
              ))}
            </div>
          </div>

          {/* 스켈레톤 UI */}
          <div className="space-y-4 pt-4">
            <motion.div
              className="h-6 bg-white/10 rounded-lg w-3/4 mx-auto"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="h-4 bg-white/10 rounded-lg w-1/2 mx-auto"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.div
              className="h-4 bg-white/10 rounded-lg w-2/3 mx-auto"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
