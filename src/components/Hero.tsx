import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'
import { sampleData } from '../data/sample'
import { formatDateTime } from '../lib/dateUtils'
import { useAudio } from '../hooks/useAudio'
import { Button } from './ui/Button'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { couple, wedding } = sampleData
  const { isPlaying, isLoading, toggle, error } = useAudio({
    src: '/music.mp3',
    volume: 0.4,
    loop: true,
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header
      className="relative min-h-screen flex items-center justify-center floral-pattern paper-texture overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #FFF9F6 0%, #F6F2ED 100%)',
      }}
      aria-label="메인 히어로 섹션"
    >
      {/* 배경 그라데이션 및 노이즈 텍스처 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/3 rounded-full blur-3xl" />
      </div>

      {/* 음악 제어 버튼 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-6 right-4 md:top-8 md:right-8 z-20"
      >
        <Button
          variant="ghost"
          size="md"
          onClick={toggle}
          disabled={isLoading}
          className="rounded-full w-12 h-12 p-0 bg-white/80 backdrop-blur-sm shadow-soft hover:bg-white/90"
          aria-label={isPlaying ? '음악 끄기' : '음악 켜기'}
          aria-pressed={isPlaying}
        >
          {isLoading ? (
            <Music className="w-5 h-5 text-brand-primary animate-pulse" aria-hidden="true" />
          ) : isPlaying ? (
            <Volume2 className="w-5 h-5 text-brand-primary" aria-hidden="true" />
          ) : (
            <VolumeX className="w-5 h-5 text-brand-ink/50" aria-hidden="true" />
          )}
        </Button>
        {error && (
          <p className="absolute top-full mt-2 text-xs text-red-500 whitespace-nowrap" role="alert">
            {error}
          </p>
        )}
      </motion.div>

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-sm sm:text-base text-brand-ink/60 tracking-wider mb-8 font-script"
          >
            Save the Date
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-light text-brand-ink mb-4 tracking-wider"
          >
            <motion.span
              className="block mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {couple.groomName}
            </motion.span>
            <motion.span
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-primary/70 font-light font-script"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              &
            </motion.span>
            <motion.span
              className="block mt-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {couple.brideName}
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 space-y-2"
          >
            <p className="text-lg sm:text-xl text-brand-ink/80 tracking-wide font-body">
              {formatDateTime(wedding.date, wedding.time)}
            </p>
            <p className="text-base sm:text-lg text-brand-ink/60 font-body">
              {wedding.hall}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-20 animate-gentle-bounce"
        >
          <div className="w-6 h-10 border-2 border-brand-primary/30 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-brand-primary/50 rounded-full" />
          </div>
        </motion.div>
      </div>
    </header>
  )
}

