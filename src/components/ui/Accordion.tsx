import { ReactNode, useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface AccordionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const contentId = `accordion-content-${title.replace(/\s+/g, '-').toLowerCase()}`

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleToggle()
    }
  }

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const focusableElements = buttonRef.current
        .closest('.accordion-container')
        ?.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')
      const firstElement = focusableElements?.[1] as HTMLElement
      firstElement?.focus()
    }
  }, [isOpen])

  return (
    <div className="accordion-container border border-brand-primary/20 rounded-2xl overflow-hidden bg-white/70 backdrop-blur-sm shadow-soft">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="w-full px-6 py-4 flex items-center justify-between bg-white/50 hover:bg-white/70 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-label={`${title} ${isOpen ? '접기' : '펼치기'}`}
      >
        <span className="font-medium text-left text-brand-ink tracking-wide">{title}</span>
        <ChevronDown
          className={cn(
            'w-5 h-5 transition-transform text-brand-primary',
            isOpen && 'transform rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={`accordion-button-${contentId}`}
          className="p-6 bg-white/50"
        >
          {children}
        </div>
      )}
    </div>
  )
}

