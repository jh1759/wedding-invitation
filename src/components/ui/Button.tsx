import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'solid', size = 'md', disabled, 'aria-label': ariaLabel, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:ring-brand-primary/40 shadow-soft':
              variant === 'solid',
            'border-2 border-brand-primary/30 text-brand-ink hover:bg-brand-primary/10 focus-visible:ring-brand-primary/40':
              variant === 'outline',
            'text-brand-primary hover:bg-brand-primary/10 focus-visible:ring-brand-primary/40':
              variant === 'ghost',
            'px-3 py-1.5 text-sm tracking-wide': size === 'sm',
            'px-4 py-2 text-base tracking-wide': size === 'md',
            'px-6 py-3 text-lg tracking-wide': size === 'lg',
          },
          className
        )}
        disabled={disabled}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

