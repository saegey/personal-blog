import { Box, Flex, Text, Close } from 'theme-ui'
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
    <Box
      ref={overlayRef as any}
      variant="styles.faded"
      onMouseDown={onOverlayMouseDown}
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        p: [3, 4],
        // Fade the overlay in/out
        opacity: visible && !closing ? 1 : 0,
        transition: 'opacity .2s ease',
      }}
      aria-hidden={false}
    >
      <Box
        ref={dialogRef as any}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        sx={{
          backgroundColor: 'background',
          width: '100%',
          maxWidth: ['100%', '720px'],
          maxHeight: '90vh',
          // Use a column layout so header stays fixed and only content scrolls
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'card',
          border: '1px solid',
          borderColor: 'cardBorderColor',
          boxShadow: 'card',
          transform: visible && !closing ? 'translateY(0)' : 'translateY(8px)',
          opacity: visible && !closing ? 1 : 0,
          transition: 'opacity .2s ease, transform .2s ease',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            p: 3,
            borderBottom: '1px solid',
            borderColor: 'cardBorderColor',
          }}
        >
          <Box>
            <Text id="modal-title" as="h2" variant="resultsHeading">
              {title}
            </Text>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            <Close
              ref={closeBtnRef as any}
              onClick={handleRequestClose}
              ml="auto"
              mr={-2}
              sx={{ color: 'text', cursor: 'pointer' }}
              aria-label="Close modal"
            />
          </Box>
        </Flex>
        <Box
          sx={{
            p: 3,
            // Make the content the scrollable region
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

export default MaximizedContainer
