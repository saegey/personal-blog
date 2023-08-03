const GradeGradient = ({ data, xMax }) => {
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
}

export default GradeGradient
