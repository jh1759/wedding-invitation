import { useEffect } from 'react'
import { Check } from 'lucide-react'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, isVisible, onClose, duration = 2000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-brand-primary text-white px-6 py-3 rounded-2xl shadow-soft flex items-center gap-2 backdrop-blur-sm">
        <Check className="w-5 h-5" />
        <span className="font-medium tracking-wide">{message}</span>
      </div>
    </div>
  )
}

