'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FortuneGrade } from '@/lib/fortuneData'

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
  xOffset: number
  emoji: string
}

interface ParticleEffectProps {
  count?: number
  grade?: FortuneGrade
}

const gradeEmojis: Record<FortuneGrade, string[]> = {
  divine: ['✨', '⭐', '🌟', '💫', '🔥', '⚡'],
  special: ['✨', '⭐', '💫', '💖'],
  normal: ['✨', '💫'],
}

export default function ParticleEffect({ count = 20, grade = 'normal' }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const emojis = gradeEmojis[grade]
    const newParticles: Particle[] = []

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: grade === 'divine' ? 1.5 + Math.random() * 1 : 1 + Math.random() * 1,
        xOffset: (Math.random() - 0.5) * (grade === 'divine' ? 100 : 60),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      })
    }

    setParticles(newParticles)
  }, [count, grade])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute ${grade === 'divine' ? 'text-2xl' : grade === 'special' ? 'text-xl' : 'text-lg'}`}
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
            scale: grade === 'divine' ? [0, 1.5, 1.5, 0] : [0, 1.2, 1.2, 0],
            rotate: [0, 180, 360],
            y: [0, grade === 'divine' ? -120 : -80, grade === 'divine' ? -180 : -120],
            x: [0, particle.xOffset * 0.6, particle.xOffset],
          }}
          transition={{
            delay: particle.delay,
            duration: particle.duration,
            ease: 'easeOut',
            repeat: grade === 'divine' ? Infinity : 0,
            repeatDelay: grade === 'divine' ? 0.5 : 0,
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}
    </div>
  )
}

