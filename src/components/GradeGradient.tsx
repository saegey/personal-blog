import { useEffect, useMemo } from 'react'

const GradeGradient = ({ data, xMax }) => {
  const gradients = useMemo(() => {
    console.log('render gradieents')
    return data.map((d, i) => {
      console.log('grade gradient')
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

  // return data.map((d, i) => {
  //   console.log('grade gradient')
  //   if (
  //     data.length > i + 1 &&
  //     i > 0 &&
  //     d.color === data[i - 1].color &&
  //     d.color === data[i + 1].color
  //   ) {
  //     return
  //   }
  //   const gradient = (
  //     <stop
  //       offset={Number((d.distance / xMax).toFixed(10))}
  //       stopColor={d.color}
  //       stopOpacity={1}
  //       key={`elevationGrade-${i}`}
  //     />
  //   )
  //   return gradient
  // })
}

export default GradeGradient
