'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import RippleButton from './RippleButton'

export default function NameForm() {
  const [name, setName] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      router.push(`/result?name=${encodeURIComponent(name.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[420px] mx-auto">
      <motion.input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="이름을 입력하세요"
        className="w-full px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/70 text-lg focus:outline-none focus:border-white/50 focus:bg-white/30 transition-all"
        required
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      />
      <RippleButton
        type="submit"
        className="w-full mt-4 px-8 py-4 rounded-2xl bg-white/30 backdrop-blur-md border-2 border-white/40 text-white font-semibold text-lg shadow-lg hover:bg-white/40 hover:scale-105 active:scale-95 transition-all"
      >
        예언 보기
      </RippleButton>
    </form>
  )
}

