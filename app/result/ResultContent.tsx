'use client'

import { useState, useEffect } from 'react'
import { getRandomFortune } from '@/lib/getFortune'
import FortuneCard from '@/components/FortuneCard'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ResultContentProps {
  name: string
}

export default function ResultContent({ name }: ResultContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [fortune, setFortune] = useState<ReturnType<typeof getRandomFortune> | null>(null)

  useEffect(() => {
    // 로딩 상태를 보여주기 위해 약간의 딜레이 추가
    const timer = setTimeout(() => {
      const randomFortune = getRandomFortune()
      setFortune(randomFortune)
      setIsLoading(false)
    }, 2400) // 2.4초 로딩 (0.8초 × 3단계)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading || !fortune) {
    return <LoadingSpinner />
  }

  return <FortuneCard name={name} fortune={fortune} />
}

