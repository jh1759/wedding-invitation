import { MapPin, Calendar, Clock, Building } from 'lucide-react'
import { sampleData } from '../data/sample'
import { formatDate } from '../lib/dateUtils'

export function ScheduleAndVenue() {
  const { wedding } = sampleData

  const handleMapClick = () => {
    const searchQuery = encodeURIComponent(wedding.hall)
    const mapUrl = `https://map.naver.com/v5/search/${searchQuery}`
    window.open(mapUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="section-padding bg-brand-secondary">
      <div className="container-max">
        <h2 className="text-3xl sm:text-4xl font-display font-light text-center mb-16 text-brand-ink tracking-wide">
          일정 및 장소
        </h2>

        {/* Vertical Timeline */}
        <div className="max-w-2xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-primary/20 hidden md:block" />

          <div className="space-y-8">
            {/* 날짜 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border-2 border-brand-primary/30 flex items-center justify-center shadow-soft">
                <Calendar className="w-7 h-7 text-brand-primary" />
              </div>
              <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <h3 className="font-medium text-lg mb-2 text-brand-ink">예식일</h3>
                <p className="text-brand-ink/80 tracking-wide">{formatDate(wedding.date)}</p>
              </div>
            </div>

            {/* 시간 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border-2 border-brand-primary/30 flex items-center justify-center shadow-soft">
                <Clock className="w-7 h-7 text-brand-primary" />
              </div>
              <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <h3 className="font-medium text-lg mb-2 text-brand-ink">예식 시간</h3>
                <p className="text-brand-ink/80 tracking-wide">{wedding.time}</p>
              </div>
            </div>

            {/* 장소 */}
            <div className="relative flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm border-2 border-brand-primary/30 flex items-center justify-center shadow-soft">
                <Building className="w-7 h-7 text-brand-primary" />
              </div>
              <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <h3 className="font-medium text-lg mb-3 text-brand-ink">예식장</h3>
                <p className="text-brand-ink/80 mb-2 tracking-wide">{wedding.hall}</p>
                {wedding.floor && (
                  <p className="text-sm text-brand-ink/60 mb-3">{wedding.floor}</p>
                )}
                <div className="flex items-start gap-2 mt-3">
                  <MapPin className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                  <p className="text-brand-ink/70 text-sm">{wedding.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 보기 버튼 */}
          <div className="mt-12 text-center">
            <button
              onClick={handleMapClick}
              className="inline-flex items-center justify-center px-8 py-3 text-base rounded-2xl border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 font-medium tracking-wide shadow-gentle"
            >
              <MapPin className="w-5 h-5 mr-2" />
              지도 보기
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

