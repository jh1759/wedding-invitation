import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { rsvpSchema, type RSVPFormData } from '../lib/validators'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'

export function RSVPForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
  })

  const onSubmit = (data: RSVPFormData) => {
    console.log('RSVP 제출:', JSON.stringify(data, null, 2))
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="section-padding bg-white/50 backdrop-blur-sm">
      <div className="container-max">
        <h2 className="text-3xl sm:text-4xl font-display font-light text-center mb-16 text-brand-ink tracking-wide">
          참석 여부
        </h2>

        <div className="max-w-2xl mx-auto">
          {isSubmitted ? (
            <div className="bg-white/70 backdrop-blur-sm border border-brand-accent/30 rounded-3xl p-8 text-center shadow-soft">
              <p className="text-brand-ink text-lg tracking-wide">
                참석 여부가 전달되었습니다. 감사합니다! 🌿
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/70 backdrop-blur-sm rounded-3xl shadow-soft p-8 md:p-12">
              <Input
                label="이름 *"
                type="text"
                {...register('name')}
                error={errors.name?.message}
                placeholder="이름을 입력해주세요"
              />

              <div>
                <label className="block text-sm font-medium mb-1.5 text-brand-ink">인원수 *</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  {...register('guestCount', { valueAsNumber: true })}
                  className="w-full px-4 py-2 rounded-2xl border border-[#EADFD5] bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/40 text-brand-ink"
                  placeholder="1~10명"
                />
                {errors.guestCount && (
                  <p className="mt-1 text-sm text-red-500" role="alert">
                    {errors.guestCount.message}
                  </p>
                )}
              </div>

              <Input
                label="연락처 *"
                type="tel"
                {...register('contact')}
                error={errors.contact?.message}
                placeholder="010-1234-5678"
                helperText="휴대전화 번호를 입력해주세요"
              />

              <Textarea
                label="메모"
                {...register('message')}
                error={errors.message?.message}
                placeholder="전하고 싶은 말씀이 있으시면 입력해주세요 (선택사항)"
                rows={4}
              />

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-to-r from-[#FFDEE9] to-[#B5FFFC] text-brand-ink hover:opacity-90 transition-opacity shadow-soft"
              >
                제출하기
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

