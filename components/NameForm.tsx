"use client";

import { useState, useRef, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RippleButton from "./RippleButton";

// 번호별 고유 색상
const numberConfigs = [
  { color: "from-yellow-400/40 to-orange-400/40" },
  { color: "from-purple-400/40 to-pink-400/40" },
  { color: "from-blue-400/40 to-cyan-400/40" },
  { color: "from-green-400/40 to-emerald-400/40" },
  { color: "from-red-400/40 to-orange-400/40" },
  { color: "from-indigo-400/40 to-purple-400/40" },
  { color: "from-pink-400/40 to-rose-400/40" },
  { color: "from-slate-400/40 to-gray-400/40" },
  { color: "from-amber-400/40 to-yellow-400/40" },
  { color: "from-violet-400/40 to-purple-400/40" },
];

export default function NameForm() {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number; number: number }>
  >([]);
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const router = useRouter();

  const handleNumberClick = (num: number, e: MouseEvent<HTMLButtonElement>) => {
    const button = buttonRefs.current[num];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 리플 효과 생성
    const newRipple = {
      x,
      y,
      id: Date.now(),
      number: num,
    };

    setRipples((prev) => [...prev, newRipple]);

    // 리플 제거
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    setSelectedNumber(num === selectedNumber ? null : num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && selectedNumber !== null) {
      router.push(`/result?name=${encodeURIComponent(name.trim())}`);
    } else if (!selectedNumber) {
      alert("끌리는 번호를 선택해주세요!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[420px] mx-auto">
      <motion.input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="이름을 입력하세요"
        className="w-full px-6 py-5 rounded-2xl glassmorphism-strong text-white placeholder-white/60 text-xl font-bold focus:outline-none transition-all"
        required
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? [
                "0 12px 40px 0 rgba(0, 0, 0, 0.4), inset 0 2px 0 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
                "0 16px 48px 0 rgba(168, 85, 247, 0.3), inset 0 2px 0 0 rgba(255, 255, 255, 0.5), inset 0 -2px 0 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.2)",
                "0 12px 40px 0 rgba(0, 0, 0, 0.4), inset 0 2px 0 0 rgba(255, 255, 255, 0.4), inset 0 -2px 0 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              ]
            : undefined,
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1], // 개선된 ease-out-expo
          scale: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }, // ease-in-out
          boxShadow: isFocused
            ? {
                duration: 2,
                repeat: Infinity,
                ease: [0.25, 0.1, 0.25, 1], // ease-in-out
              }
            : undefined,
        }}
      />
      {/* 1~10 숫자 선택 (재미 요소) */}
      <div className="mt-4">
        <motion.p
          key={selectedNumber}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/80 text-sm mb-3 text-center font-medium"
        >
          {selectedNumber !== null
            ? `${selectedNumber}을(를) 선택했습니다`
            : "끌리는 번호를 선택하세요"}
        </motion.p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
            const config = numberConfigs[num - 1];
            const isSelected = selectedNumber === num;

            return (
              <motion.button
                key={num}
                ref={(el) => {
                  buttonRefs.current[num] = el;
                }}
                type="button"
                onClick={(e) => handleNumberClick(num, e)}
                className={`px-4 py-3 rounded-xl font-black text-lg transition-all relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br ${config.color} text-white border-2 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)] backdrop-blur-md`
                    : "glassmorphism text-white/60 hover:text-white"
                }`}
                whileHover={
                  !isSelected
                    ? {
                        scale: 1.05,
                        rotate: [0, -2, 2, -2, 2, 0],
                        transition: {
                          scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                          rotate: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1], // ease-in-out
                          },
                        },
                      }
                    : {}
                }
                whileTap={{
                  scale: 0.9,
                  transition: { duration: 0.15, ease: [0.16, 1, 0.3, 1] },
                }}
                animate={
                  isSelected
                    ? {
                        scale: 1.1,
                        boxShadow: [
                          "0 0 20px rgba(255,255,255,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                          "0 0 30px rgba(255,255,255,0.4), inset 0 2px 4px rgba(255,255,255,0.3)",
                          "0 0 20px rgba(255,255,255,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                        ],
                      }
                    : {}
                }
                transition={
                  isSelected
                    ? {
                        scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }, // 약간의 bounce
                        boxShadow: {
                          duration: 1.5,
                          repeat: Infinity,
                          ease: [0.25, 0.1, 0.25, 1], // ease-in-out
                        },
                      }
                    : {}
                }
              >
                {/* 리플 효과 */}
                {ripples
                  .filter((ripple) => ripple.number === num)
                  .map((ripple) => (
                    <motion.span
                      key={ripple.id}
                      className="absolute rounded-full bg-white/40"
                      initial={{
                        width: 0,
                        height: 0,
                        left: ripple.x,
                        top: ripple.y,
                        x: "-50%",
                        y: "-50%",
                      }}
                      animate={{
                        width: 100,
                        height: 100,
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1], // 개선된 ease-out-expo
                        width: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                        height: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                      }}
                    />
                  ))}

                {/* 반짝이는 오버레이 */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* 번호 */}
                <span className="relative z-10">{num}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <RippleButton
        type="submit"
        className={`w-full mt-4 px-8 py-5 rounded-2xl glassmorphism-button text-white font-black text-xl tracking-wide hover:scale-105 active:scale-95 transition-all ${
          selectedNumber === null ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={selectedNumber === null}
      >
        예언 보기
      </RippleButton>
    </form>
  );
}
