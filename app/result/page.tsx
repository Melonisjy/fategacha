'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getRandomFortune } from '@/lib/getFortune'
import FortuneCard from '@/components/FortuneCard'
import LoadingSpinner from '@/components/LoadingSpinner'
import BackgroundAnimation from '@/components/BackgroundAnimation'

export default function ResultPage() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || '익명'
  const [isLoading, setIsLoading] = useState(true)
  const [fortune, setFortune] = useState<ReturnType<typeof getRandomFortune> | null>(null)

  useEffect(() => {
    // 로딩 상태를 보여주기 위해 약간의 딜레이 추가
    const timer = setTimeout(() => {
      const randomFortune = getRandomFortune()
      setFortune(randomFortune)
      setIsLoading(false)
    }, 1500) // 1.5초 로딩

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <BackgroundAnimation />
      {isLoading || !fortune ? (
        <LoadingSpinner />
      ) : (
        <FortuneCard name={name} fortune={fortune} />
      )}
    </main>
  )
}

