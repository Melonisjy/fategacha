'use client'

import { useEffect, useState } from 'react'

export default function BackgroundAnimation() {
  const [snowflakes, setSnowflakes] = useState<number[]>([])
  const [stars, setStars] = useState<number[]>([])

  useEffect(() => {
    // 눈송이 생성
    const snowflakeCount = 30
    const newSnowflakes = Array.from({ length: snowflakeCount }, (_, i) => i)
    setSnowflakes(newSnowflakes)

    // 별 생성
    const starCount = 20
    const newStars = Array.from({ length: starCount }, (_, i) => i)
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 눈송이 */}
      {snowflakes.map((index) => (
        <div
          key={`snow-${index}`}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${0.5 + Math.random() * 1}em`,
          }}
        >
          ❄
        </div>
      ))}

      {/* 별 */}
      {stars.map((index) => (
        <div
          key={`star-${index}`}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1.5 + Math.random() * 1}s`,
            fontSize: `${0.8 + Math.random() * 0.8}em`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  )
}

