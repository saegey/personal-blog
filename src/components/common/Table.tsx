import { ReactNode } from 'react'

type Props = { children: ReactNode; caption?: string }

const Table = ({ children, caption }: Props) => (
  <div className="my-8 overflow-x-auto">
    {caption && <p className="mb-3 font-condensed text-sm font-medium uppercase tracking-label text-muted">{caption}</p>}
    <table className="w-full min-w-[38rem] border-collapse border-y border-line text-left text-base sm:text-lg [&_td]:border-b [&_td]:border-line [&_td]:px-4 [&_td]:py-3 [&_th]:border-b [&_th]:border-line [&_th]:px-4 [&_th]:py-3 [&_th]:font-condensed [&_th]:text-xs [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-label [&_th]:text-muted">
      {children}
    </table>
  </div>
)

export default Table
