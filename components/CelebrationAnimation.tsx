"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CelebrationAnimationProps {
  show: boolean;
  onComplete: () => void;
}

export default function CelebrationAnimation({
  show,
  onComplete,
}: CelebrationAnimationProps) {
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    delay: number;
    duration: number;
  }>>([]);

  useEffect(() => {
    if (show) {
      const confettiCount = 30;
      const newConfetti = Array.from({ length: confettiCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 1 + Math.random() * 1,
      }));
      setConfetti(newConfetti);

      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* 축하 메시지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="text-6xl font-bold text-white drop-shadow-lg text-center">
              🎉
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white text-xl font-bold mt-4 text-center"
            >
              공유 완료!
            </motion.div>
          </motion.div>

          {/* 컨페티 효과 */}
          {confetti.map((item) => (
            <motion.div
              key={item.id}
              className="absolute text-2xl"
              style={{
                left: `${item.x}%`,
                top: "20%",
              }}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: [0, 180, 360],
                y: [0, typeof window !== "undefined" ? window.innerHeight : 800],
                x: [
                  0,
                  (Math.random() - 0.5) * 200,
                  (Math.random() - 0.5) * 300,
                ],
              }}
              transition={{
                delay: item.delay,
                duration: item.duration,
                ease: "easeOut",
              }}
            >
              {["🎉", "✨", "🎊", "⭐"][item.id % 4]}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

