import { useMemo } from 'react'

interface GradeGradient {
  data: Array<{
    color: string
    distance: number
  }>
  xMax: number
}

const GradeGradient = ({ data, xMax }: GradeGradient) => {
  const gradients = useMemo(() => {
    return data.map((d, i) => {
      if (
        data.length > i + 1 &&
        i > 0 &&
        d.color === data[i - 1].color &&
        d.color === data[i + 1].color
      ) {
        return
      }
      const gradient = (
        <stop
          offset={Number((d.distance / xMax).toFixed(10))}
          stopColor={d.color}
          stopOpacity={1}
          key={`elevationGrade-${i}`}
        />
      )
      return gradient
    })
  }, [data])

  return gradients
}

export default GradeGradient
