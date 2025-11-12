import { Suspense } from 'react'
import ResultContent from './ResultContent'
import LoadingSpinner from '@/components/LoadingSpinner'
import BackgroundAnimation from '@/components/BackgroundAnimation'

interface ResultPageProps {
  searchParams: { name?: string }
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const name = searchParams.name || '익명'

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <BackgroundAnimation />
      <Suspense fallback={<LoadingSpinner />}>
        <ResultContent name={name} />
      </Suspense>
    </main>
  )
}

