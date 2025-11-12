import NameForm from '@/components/NameForm'
import BackgroundAnimation from '@/components/BackgroundAnimation'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10">
      <BackgroundAnimation />
      
      <div className="w-full max-w-[420px] mx-auto text-center space-y-8 fade-in">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            🔮 운명가챠
          </h1>
          <p className="text-purple-100 text-lg">
            2026년, 당신에게 하나의 사건이 일어난다
          </p>
        </div>

        <NameForm />

        <p className="text-white/60 text-sm mt-12">
          made with 💫 by fategacha
        </p>
      </div>
    </main>
  )
}

