import { useState, useEffect, useCallback } from 'react'
import type { Comment } from '../types'

const STORAGE_KEY = 'wedding-comments'

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // localStorage에서 댓글 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Comment[]
        // 날짜순으로 정렬 (최신순)
        const sorted = parsed.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setComments(sorted)
      }
    } catch (error) {
      console.error('Failed to load comments:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // 댓글 추가
  const addComment = useCallback((comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }

    setComments((prev) => {
      const updated = [newComment, ...prev]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to save comment:', error)
      }
      return updated
    })

    return newComment.id
  }, [])

  // 댓글 삭제
  const deleteComment = useCallback((id: string, password: string) => {
    const comment = comments.find((c) => c.id === id)
    if (!comment) {
      return { success: false, message: '댓글을 찾을 수 없습니다.' }
    }

    if (comment.password !== password) {
      return { success: false, message: '비밀번호가 일치하지 않습니다.' }
    }

    setComments((prev) => {
      const updated = prev.filter((c) => c.id !== id)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (error) {
        console.error('Failed to delete comment:', error)
      }
      return updated
    })

    return { success: true, message: '댓글이 삭제되었습니다.' }
  }, [comments])

  return {
    comments,
    isLoading,
    addComment,
    deleteComment,
  }
}

