import { Share2, Link2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/Button'
import { motion, AnimatePresence } from 'framer-motion'

export function ShareButtons() {
  const [copied, setCopied] = useState(false)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = '신재훈 & 박연정 결혼식'
  const shareText = '2026년 5월 24일, 여러분을 따뜻하게 초대합니다.'
  const hasNativeShare = typeof navigator !== 'undefined' && 'share' in navigator

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy URL:', error)
    }
  }

  const handleKakaoShare = () => {
    // 카카오톡 공유 (Kakao SDK 필요 시 구현)
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`
    window.open(kakaoUrl, '_blank', 'width=600,height=600')
  }

  const handleNaverShare = () => {
    // 네이버 공유
    const naverUrl = `https://share.naver.com/web/shareView?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}`
    window.open(naverUrl, '_blank', 'width=600,height=600')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: currentUrl,
        })
      } catch (error) {
        // 사용자가 공유를 취소한 경우
        if ((error as Error).name !== 'AbortError') {
          console.error('Share failed:', error)
        }
      }
    } else {
      // 네이티브 공유가 지원되지 않으면 URL 복사
      handleCopyUrl()
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 justify-center" role="group" aria-label="공유 옵션">
      {/* 네이티브 공유 (모바일) */}
      {hasNativeShare && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleNativeShare}
          className="gap-2"
          aria-label="공유하기"
        >
          <Share2 className="w-4 h-4" aria-hidden="true" />
          공유하기
        </Button>
      )}

      {/* 카카오톡 공유 */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleKakaoShare}
        className="gap-2"
        aria-label="카카오톡으로 공유"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
        </svg>
        카카오톡
      </Button>

      {/* 네이버 공유 */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleNaverShare}
        className="gap-2"
        aria-label="네이버로 공유"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z" />
        </svg>
        네이버
      </Button>

      {/* URL 복사 */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyUrl}
        className="gap-2"
        aria-label={copied ? 'URL이 복사되었습니다' : 'URL 복사'}
        aria-pressed={copied}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-1"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>복사됨</span>
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-1"
            >
              <Copy className="w-4 h-4" aria-hidden="true" />
              <span>URL 복사</span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}

