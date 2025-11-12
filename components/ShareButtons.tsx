"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RippleButton from "./RippleButton";

interface ShareButtonsProps {
  text: string;
  onShare: (platform: string) => void;
  onScreenshot?: () => void;
}

export default function ShareButtons({
  text,
  onShare,
  onScreenshot,
}: ShareButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions = [
    {
      name: "인스타그램",
      icon: "📷",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      action: () => {
        // 인스타그램은 직접 공유 불가, 클립보드 복사 안내
        navigator.clipboard.writeText(text);
        alert("텍스트가 복사되었습니다. 인스타그램에 붙여넣기 하세요!");
        onShare("인스타그램");
      },
    },
    {
      name: "복사",
      icon: "📋",
      color: "bg-gray-400",
      action: async () => {
        try {
          await navigator.clipboard.writeText(text);
          onShare("복사");
        } catch (err) {
          alert("복사에 실패했습니다.");
        }
      },
    },
  ];

  return (
    <>
      <RippleButton
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-5 rounded-2xl neomorphic-button text-white font-black text-xl tracking-wide hover:scale-105 active:scale-95 transition-all"
      >
        📤 공유하기
      </RippleButton>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white/10 backdrop-blur-xl rounded-t-3xl border-t-2 border-white/30"
            >
              <div className="max-w-[420px] mx-auto">
                <div className="text-white text-center mb-4 font-semibold">
                  공유하기
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {shareOptions.map((option, index) => (
                    <motion.button
                      key={option.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => {
                        option.action();
                        setIsOpen(false);
                      }}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl neomorphic hover:scale-105 transition-all"
                    >
                      <div
                        className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center text-2xl`}
                      >
                        {option.icon}
                      </div>
                      <span className="text-white text-xs font-medium">
                        {option.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
