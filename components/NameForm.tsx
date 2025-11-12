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
        <p className="text-white/80 text-sm mb-3 text-center font-medium">
          끌리는 번호를 선택하세요
        </p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <motion.button
              key={num}
              type="button"
              onClick={() =>
                setSelectedNumber(num === selectedNumber ? null : num)
              }
              className={`px-4 py-3 rounded-xl font-black text-lg transition-all ${
                selectedNumber === num
                  ? "neomorphic-button text-white scale-110"
                  : "neomorphic text-white/60 hover:text-white hover:scale-105"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {num}
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
