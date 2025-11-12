'use client'

import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="w-full max-w-[420px] mx-auto">
      <motion.div
        className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border-2 border-white/30 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center space-y-6">
          {/* 로딩 애니메이션 */}
          <div className="flex justify-center">
            <motion.div
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full"></div>
            </motion.div>
          </div>

          {/* 로딩 메시지 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h3 className="text-white text-xl font-semibold">
              운명을 뽑는 중...
            </h3>
            <motion.p
              className="text-purple-200 text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              잠시만 기다려주세요
            </motion.p>
          </motion.div>

          {/* 스켈레톤 UI */}
          <div className="space-y-4 pt-4">
            <div className="h-6 bg-white/10 rounded-lg w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded-lg w-1/2 mx-auto animate-pulse"></div>
            <div className="h-4 bg-white/10 rounded-lg w-2/3 mx-auto animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

