import { z } from 'zod'

// 휴대전화 번호 정규식: 010-1234-5678, 010-1234-5678, 01012345678 등
const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/

export const rsvpSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요').max(50, '이름은 50자 이하로 입력해주세요'),
  guestCount: z
    .number()
    .int('인원수는 정수여야 합니다')
    .min(1, '최소 1명 이상 입력해주세요')
    .max(10, '최대 10명까지 입력 가능합니다'),
  contact: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .regex(phoneRegex, '올바른 휴대전화 번호를 입력해주세요 (예: 010-1234-5678)'),
  message: z.string().max(500, '메모는 500자 이하로 입력해주세요').optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>

