import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Modal } from './ui/Modal'
import { useModal } from '../hooks/useModal'
import { sampleData } from '../data/sample'
import { getImagePath } from '../lib/imageUtils'

export function Gallery() {
  const { gallery: images } = sampleData
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { isOpen, open, close } = useModal()

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    open()
  }

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }

  const selectedImage = images[selectedIndex]

  return (
    <>
      <section className="section-padding bg-white/50 backdrop-blur-sm">
        <div className="container-max">
          <h2 className="text-3xl sm:text-4xl font-display font-light text-center mb-16 text-brand-ink tracking-wide">
            갤러리
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {images.map((image, index) => {
              const imageSrc = getImagePath(image.thumbnail || image.src)
              return (
                <button
                  key={image.id}
                  onClick={() => handleImageClick(index)}
                  className="relative aspect-square overflow-hidden rounded-2xl group shadow-soft"
                  aria-label={`${image.alt} 보기`}
                >
                  <img
                    src={imageSrc}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                    width={400}
                    height={400}
                    onError={(e) => {
                      // 확장자 자동 시도: jpg -> jpeg -> png -> gif -> webp -> jfif
                      const target = e.currentTarget
                      const basePath = image.src
                      const extensions = ['jpeg', 'png', 'gif', 'webp', 'jfif', 'svg']
                      const currentSrc = target.src
                      const currentExt = currentSrc.match(/\.(\w+)$/)?.[1]
                      
                      if (currentExt === 'jpg') {
                        // jpg 실패 시 jpeg 시도
                        const nextIndex = extensions.indexOf('jpeg')
                        if (nextIndex >= 0) {
                          target.src = `${basePath}.${extensions[nextIndex]}`
                        }
                      } else {
                        // 다른 확장자들 시도
                        const currentIndex = extensions.indexOf(currentExt || '')
                        if (currentIndex >= 0 && currentIndex < extensions.length - 1) {
                          target.src = `${basePath}.${extensions[currentIndex + 1]}`
                        }
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <Modal isOpen={isOpen} onClose={close} size="xl">
        <div className="relative">
          <button
            onClick={close}
            className="absolute -top-12 right-0 p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative">
            <img
              src={selectedImage ? getImagePath(selectedImage.src) : ''}
              alt={selectedImage?.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                // 확장자 자동 시도
                const target = e.currentTarget
                const basePath = selectedImage?.src || ''
                const extensions = ['jpeg', 'png', 'gif', 'webp', 'jfif', 'svg']
                const currentSrc = target.src
                const currentExt = currentSrc.match(/\.(\w+)$/)?.[1]
                
                if (currentExt === 'jpg') {
                  const nextIndex = extensions.indexOf('jpeg')
                  if (nextIndex >= 0) {
                    target.src = `${basePath}.${extensions[nextIndex]}`
                  }
                } else {
                  const currentIndex = extensions.indexOf(currentExt || '')
                  if (currentIndex >= 0 && currentIndex < extensions.length - 1) {
                    target.src = `${basePath}.${extensions[currentIndex + 1]}`
                  }
                }
              }}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  aria-label="이전 이미지"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  aria-label="다음 이미지"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}

