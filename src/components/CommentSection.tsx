import { useState, useRef } from 'react'
import { useComments } from '../hooks/useComments'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'
import { Trash2, Heart, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function CommentSection() {
  const { comments, isLoading, addComment, deleteComment } = useComments()
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [password, setPassword] = useState('')
  const [deletePassword, setDeletePassword] = useState('')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return '방금 전'
    if (diffMins < 60) return `${diffMins}분 전`
    if (diffHours < 24) return `${diffHours}시간 전`
    if (diffDays < 7) return `${diffDays}일 전`

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // 유효성 검사
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = '이름을 입력해주세요.'
    if (!content.trim()) newErrors.content = '축하 메시지를 입력해주세요.'
    if (!password.trim()) newErrors.password = '비밀번호를 입력해주세요.'
    if (password.length < 4) newErrors.password = '비밀번호는 4자 이상이어야 합니다.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      addComment({
        name: name.trim(),
        content: content.trim(),
        password: password.trim(),
      })

      // 폼 초기화
      setName('')
      setContent('')
      setPassword('')
      formRef.current?.reset()
    } catch (error) {
      setErrors({ submit: '메시지 등록에 실패했습니다. 다시 시도해주세요.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = (id: string) => {
    if (!deletePassword.trim()) {
      setErrors({ delete: '비밀번호를 입력해주세요.' })
      return
    }

    const result = deleteComment(id, deletePassword.trim())
    if (result.success) {
      setDeletingId(null)
      setDeletePassword('')
      setErrors({})
    } else {
      setErrors({ delete: result.message })
    }
  }

  return (
    <section className="section-padding bg-white/50 backdrop-blur-sm" aria-labelledby="comments-heading">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            id="comments-heading"
            className="text-3xl sm:text-4xl font-display font-light text-center mb-16 text-brand-ink tracking-wide"
          >
            축하 메시지
          </h2>

          {/* 댓글 작성 폼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-soft p-6 md:p-8 space-y-4">
                <Input
                  label="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력해주세요"
                  error={errors.name}
                  maxLength={20}
                  aria-required="true"
                />

                <Textarea
                  label="축하 메시지"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="축하 메시지를 남겨주세요"
                  rows={4}
                  error={errors.content}
                  maxLength={500}
                  aria-required="true"
                />

                <Input
                  label="비밀번호"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="삭제 시 사용할 비밀번호 (4자 이상)"
                  error={errors.password}
                  helperText="본인 메시지 삭제 시 사용됩니다"
                  aria-required="true"
                />

                {errors.submit && (
                  <p className="text-sm text-red-500" role="alert">
                    {errors.submit}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto md:ml-auto md:block"
                  aria-label="축하 메시지 등록"
                >
                  <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                  등록하기
                </Button>
              </div>
            </form>
          </motion.div>

          {/* 댓글 목록 */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12 text-brand-ink/60">로딩 중...</div>
            ) : comments.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-brand-ink/60"
              >
                <Heart className="w-12 h-12 mx-auto mb-4 text-brand-primary/40" aria-hidden="true" />
                <p>아직 축하 메시지가 없습니다.</p>
                <p className="text-sm mt-2">첫 번째 축하 메시지를 남겨주세요!</p>
              </motion.div>
            ) : (
              <AnimatePresence>
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-card p-6 border border-brand-primary/10"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-brand-ink">{comment.name}</h3>
                          <span className="text-xs text-brand-ink/50">{formatDate(comment.createdAt)}</span>
                        </div>
                        <p className="text-brand-ink/80 leading-relaxed whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>

                      {deletingId === comment.id ? (
                        <div className="flex flex-col gap-2 min-w-[200px]">
                          <Input
                            type="password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            placeholder="비밀번호"
                            size="sm"
                            className="text-sm"
                            error={errors.delete}
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="solid"
                              onClick={() => handleDelete(comment.id)}
                              className="flex-1"
                              aria-label="삭제 확인"
                            >
                              확인
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setDeletingId(null)
                                setDeletePassword('')
                                setErrors({})
                              }}
                              aria-label="취소"
                            >
                              취소
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setDeletingId(comment.id)
                            setDeletePassword('')
                            setErrors({})
                          }}
                          className="text-brand-ink/50 hover:text-red-500"
                          aria-label={`${comment.name}님의 메시지 삭제`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

