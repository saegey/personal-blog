import type { ReactNode } from 'react'

import Maximize from './Maximize'

type Props = {
  children: ReactNode
  title: string
  openModal: (arg: boolean) => void
  expandableOnMobile?: boolean
}
const ExpandableCard = ({ children, title, openModal }: Props) => {
  const handleClick: React.MouseEventHandler = e => {
    const target = e.target as HTMLElement
    // Ignore clicks that originate on interactive descendants
    // Note: don't include [role="button"] so we don't match the figure itself
    if (target && target.closest('button, a, input, textarea, select, [role="link"]')) {
      return
    }
    openModal(true)
  }

  const handleKeyDown: React.KeyboardEventHandler = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openModal(true)
    }
  }

  return (
    <figure
      role="button"
      tabIndex={0}
      aria-label={`Expand ${title}`}
      className="my-10 border-y border-line py-4"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-heading text-2xl font-medium">{title}</h2>
        <div>
          <Maximize onClick={openModal} />
        </div>
      </div>
      {children}
    </figure>
  )
}

export default ExpandableCard
