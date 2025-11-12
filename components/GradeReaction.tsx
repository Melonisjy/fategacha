'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FortuneGrade } from '@/lib/fortuneData'

interface GradeReactionProps {
  grade: FortuneGrade
  show: boolean
  onComplete: () => void
}

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  emoji: string
  xOffset: number
  yOffset: number
}

export default function GradeReaction({ grade, show, onComplete }: GradeReactionProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (show) {
      const particleCount = grade === 'divine' ? 100 : grade === 'special' ? 50 : 20
      const emojis = 
        grade === 'divine' 
          ? ['🎉', '✨', '🎊', '⭐', '🌟', '💫', '🔥', '⚡', '💎', '👑']
          : grade === 'special'
          ? ['✨', '⭐', '💫', '💖', '🌟', '🎁']
          : ['✨', '💫']

      const newParticles: Particle[] = []
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 1.5 + Math.random() * 1,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          xOffset: (Math.random() - 0.5) * 200,
          yOffset: -100 - Math.random() * 100,
        })
      }
      setParticles(newParticles)

      const timer = setTimeout(() => {
        onComplete()
        setParticles([])
      }, grade === 'divine' ? 3000 : grade === 'special' ? 2000 : 1500)

      return () => clearTimeout(timer)
    }
  }, [show, grade, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 등급별 메시지 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className={`text-4xl md:text-5xl font-bold drop-shadow-2xl ${
              grade === 'divine' 
                ? 'text-yellow-300' 
                : grade === 'special' 
                ? 'text-pink-300' 
                : 'text-purple-200'
            }`}
          >
            {grade === 'divine' && '🎉 신의 예언! 🎉'}
            {grade === 'special' && '⭐ 특별한 예언! ⭐'}
            {grade === 'normal' && '💫 평범한 예언 💫'}
          </motion.div>

          {/* 파티클 효과 */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute text-2xl md:text-3xl"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1.5, 0],
                rotate: [0, 180, 360],
                y: [0, particle.yOffset],
                x: [0, particle.xOffset * 0.3, particle.xOffset],
              }}
              transition={{
                delay: particle.delay,
                duration: particle.duration,
                ease: 'easeOut',
              }}
            >
              {particle.emoji}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

