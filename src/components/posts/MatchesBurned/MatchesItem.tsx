type ItemProps = {
  index: number
  d: {
    averagePower: number
    totalJoules: number
    totalTime: number
    vals?: number[]
    startTime?: string
  }
}

const MatchesItem = ({ index, d }: ItemProps) => {
  return (
    <div key={`match${index}`} className="grid grid-cols-3 border-b border-line py-2 font-serif text-sm sm:text-base">
      <p>{d.averagePower} watts</p>
      <p className="text-center">{(d.totalJoules / 1000).toFixed(2)} kJ</p>
      <p className="text-right">{d.totalTime} sec</p>
    </div>
  )
}

export default MatchesItem
