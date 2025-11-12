"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function LoadingSpinner() {
  const [cards, setCards] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    // 카드 덱 생성 (운명을 뽑는 효과)
    const cardDeck = ["✨", "⭐", "💫", "🌟", "🎯", "🔮", "🎲", "🎴"];
    setCards(cardDeck);

    // 카드를 빠르게 섞는 효과
    const shuffleInterval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % cardDeck.length);
    }, 150);

    return () => clearInterval(shuffleInterval);
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
          {/* 운명을 뽑는 듯한 애니메이션 */}
          <div className="flex justify-center items-center">
            <div className="relative w-32 h-40 perspective-1000">
              {/* 카드 덱 */}
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

              {/* 뒤에 있는 카드들 (깊이감) */}
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
          </div>

          {/* 로딩 메시지 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <motion.h3
              className="text-white text-xl font-semibold"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              운명을 뽑는 중...
            </motion.h3>
            <motion.p
              className="text-purple-200 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              잠시만 기다려주세요
            </motion.p>
          </motion.div>

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
