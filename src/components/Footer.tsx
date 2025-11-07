import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { ShareButtons } from './ShareButtons'

export function Footer() {
  return (
    <footer className="bg-brand-primary/10 border-t border-brand-primary/20 py-12" role="contentinfo">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* 공유 버튼 */}
          <div>
            <h3 className="text-sm font-medium text-brand-ink/70 mb-4 tracking-wide">
              청첩장 공유하기
            </h3>
            <ShareButtons />
          </div>

          {/* 감사 인사 */}
          <div className="pt-8 border-t border-brand-primary/10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-brand-primary fill-brand-primary" aria-hidden="true" />
              <p className="text-base text-brand-ink/70 tracking-wide font-body">
                소중한 분들을 초대합니다
              </p>
              <Heart className="w-5 h-5 text-brand-primary fill-brand-primary" aria-hidden="true" />
            </div>
            <p className="text-sm text-brand-ink/50 tracking-wide">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

