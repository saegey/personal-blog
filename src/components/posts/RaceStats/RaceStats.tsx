import { memo } from 'react'

interface Item {
  title: string
  value: string | number
}

type Props = {
  items: ReadonlyArray<Item>
}

const RaceStats = ({ items }: Props) => {
  if (!items?.length) return null

  return (
    <div className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3">
      {items.map(item => (
        <div key={item.title} className="border-b border-r border-line px-4 py-5 sm:px-5 sm:py-6">
          <p className="font-condensed text-xs font-medium uppercase tracking-label text-muted">{item.title}</p>
          <p className="mt-3 font-serif text-2xl leading-none tracking-[-0.025em] sm:text-3xl">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

export default memo(RaceStats)
