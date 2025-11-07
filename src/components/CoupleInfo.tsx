import { Heart } from 'lucide-react'
import { sampleData } from '../data/sample'

export function CoupleInfo() {
  const { couple } = sampleData

  return (
    <section className="section-padding bg-white/50 backdrop-blur-sm">
      <div className="container-max">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* 신랑 카드 */}
          <div className="w-full md:w-80 bg-white/70 backdrop-blur-sm rounded-3xl shadow-soft p-8 text-center">
            {couple.groomImage && (
              <div className="mb-6 flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-primary/20 shadow-gentle">
                  <img
                    src={couple.groomImage}
                    alt={couple.groomName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <h3 className="text-2xl font-display font-light text-brand-ink mb-2 tracking-wide">
              {couple.groomName}
            </h3>
            <p className="text-sm text-brand-ink/60 tracking-wide">신랑</p>
          </div>

          {/* 하트 아이콘 */}
          <div className="flex-shrink-0">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-brand-primary fill-brand-primary/20 animate-gentle-bounce" />
          </div>

          {/* 신부 카드 */}
          <div className="w-full md:w-80 bg-white/70 backdrop-blur-sm rounded-3xl shadow-soft p-8 text-center">
            {couple.brideImage && (
              <div className="mb-6 flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-brand-primary/20 shadow-gentle">
                  <img
                    src={couple.brideImage}
                    alt={couple.brideName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <h3 className="text-2xl font-display font-light text-brand-ink mb-2 tracking-wide">
              {couple.brideName}
            </h3>
            <p className="text-sm text-brand-ink/60 tracking-wide">신부</p>
          </div>
        </div>
      </div>
    </section>
  )
}

