import { TextareaHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const helperId = helperText ? `${textareaId}-helper` : undefined
    const errorId = error ? `${textareaId}-error` : undefined
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full px-4 py-3 rounded-2xl border',
            'bg-white',
            'text-brand-ink',
            'border-[#EADFD5]',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-none',
            'transition-all duration-200',
            error && 'border-red-400 focus:ring-red-400',
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-sm text-brand-ink/50 tracking-wide">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

