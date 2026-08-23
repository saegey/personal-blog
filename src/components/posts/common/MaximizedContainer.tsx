import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'

type MaxProps = {
  children: ReactNode
  openModal: Dispatch<SetStateAction<boolean>>
  title: string
}
const MaximizedContainer = ({ children, openModal, title }: MaxProps) => {
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  // Mount effects: lock scroll, focus management, show with animation
  useEffect(() => {
    if (typeof window === 'undefined') return
    previouslyFocused.current = (document.activeElement as HTMLElement) ?? null
    // Lock background scroll
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    // Animate in
    const t = window.setTimeout(() => setVisible(true), 10)

    // Focus the close button (or first focusable)
    const focusFallback = () => {
      if (closeBtnRef.current) closeBtnRef.current.focus()
      else if (dialogRef.current) dialogRef.current.focus()
    }
    const focusTimer = window.setTimeout(focusFallback, 50)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleRequestClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement as HTMLElement
        if (!e.shiftKey && active === last) {
          e.preventDefault()
          first.focus()
        } else if (e.shiftKey && active === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(t)
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      // Restore scroll
      document.documentElement.style.overflow = prevOverflow
      // Restore focus
      if (previouslyFocused.current) previouslyFocused.current.focus()
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  const handleRequestClose = () => {
    if (closing) return
    setClosing(true)
    setVisible(false)
    // Wait for CSS transition to finish before unmounting via parent state
    closeTimeoutRef.current = window.setTimeout(() => {
      openModal(false)
    }, 220)
  }

  const onOverlayMouseDown: React.MouseEventHandler<HTMLDivElement> = e => {
    // Only close when clicking the overlay, not the dialog
    if (e.target === overlayRef.current) {
      handleRequestClose()
    }
  }

  return (
    <div
      ref={overlayRef}
      onMouseDown={onOverlayMouseDown}
      className={`fixed inset-0 z-[1000] grid place-items-center bg-black/80 p-4 transition-opacity duration-200 sm:p-8 ${visible && !closing ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden={false}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`flex max-h-[90vh] w-full max-w-3xl flex-col border border-line bg-paper transition duration-200 ${visible && !closing ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="modal-title" className="font-serif text-2xl font-medium">{title}</h2>
          <div>
            <button
              ref={closeBtnRef as any}
              onClick={handleRequestClose}
              aria-label="Close modal"
              className="inline-flex h-8 w-8 items-center justify-center border border-line font-sans text-xl hover:border-ink"
            >×</button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  )
}

export default MaximizedContainer
