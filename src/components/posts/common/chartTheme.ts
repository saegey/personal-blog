export const buildChartTheme = (_theme?: unknown) => {

  const tick = {
    fill: '#666666',
    fontSize: 12,
  }

  const axisLabel = {
    fill: '#666666',
    fontSize: 13,
    fontWeight: 600
  }

  const axisLine = {
    stroke: '#dedede',
  }

  const labelFill = '#141414'
  const series = {
    line: '#141414',
  }
  const reference = {
    line: '#b8b8b8',
  }

  const tooltip = {
    box: {
      bg: 'muted',
      p: 2,
      borderRadius: 'md',
      boxShadow: 'card',
    },
    text: { fontSize: 12 },
    valueText: { fontSize: 12, fontWeight: 600 },
  }

  return { tick, axisLine, labelFill, series, reference, tooltip, axisLabel }
}

export type ChartTheme = ReturnType<typeof buildChartTheme>
