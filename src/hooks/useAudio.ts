import { useRef, useState, useEffect } from 'react'

interface UseAudioOptions {
  src: string
  volume?: number
  loop?: boolean
}

export function useAudio({ src, volume = 0.5, loop = true }: UseAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Audio 요소 생성
    const audio = new Audio(src)
    audio.volume = volume
    audio.loop = loop
    audio.preload = 'auto'

    // 이벤트 리스너
    const handleCanPlay = () => {
      setIsLoading(false)
      setError(null)
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleError = () => {
      setError('음악을 로드할 수 없습니다.')
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    audioRef.current = audio

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [src, volume, loop])

  const play = async () => {
    if (!audioRef.current) return

    try {
      await audioRef.current.play()
    } catch (err) {
      // 사용자 상호작용이 필요한 경우
      setError('음악을 재생하려면 사용자 상호작용이 필요합니다.')
      console.error('Audio play error:', err)
    }
  }

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const toggle = () => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const setVolume = (newVolume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume))
      audioRef.current.volume = clampedVolume
    }
  }

  return {
    isPlaying,
    isLoading,
    error,
    play,
    pause,
    toggle,
    setVolume,
  }
}

