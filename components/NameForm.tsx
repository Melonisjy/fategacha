"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RippleButton from "./RippleButton";

export default function NameForm() {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const router = useRouter();

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
        className="w-full px-6 py-5 rounded-2xl neomorphic text-white placeholder-white/60 text-xl font-bold focus:outline-none transition-all"
        required
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
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
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <motion.button
              key={num}
              type="button"
              onClick={() =>
                setSelectedNumber(num === selectedNumber ? null : num)
              }
              className={`px-4 py-3 rounded-xl font-black text-lg transition-all relative overflow-hidden ${
                selectedNumber === num
                  ? "bg-gradient-to-br from-purple-400/40 to-pink-400/40 text-white border-2 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_2px_4px_rgba(255,255,255,0.2)]"
                  : "neomorphic text-white/60 hover:text-white hover:scale-105"
              }`}
              whileHover={selectedNumber !== num ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.9 }}
              animate={
                selectedNumber === num
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
                selectedNumber === num
                  ? {
                      boxShadow: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
                  : {}
              }
            >
              {selectedNumber === num && (
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
              <span className="relative z-10">{num}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <RippleButton
        type="submit"
        className={`w-full mt-4 px-8 py-5 rounded-2xl neomorphic-button text-white font-black text-xl tracking-wide hover:scale-105 active:scale-95 transition-all ${
          selectedNumber === null ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={selectedNumber === null}
      >
        예언 보기
      </RippleButton>
    </form>
  );
}
