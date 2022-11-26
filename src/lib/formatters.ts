export const formatSeconds = (value: number) => {
  if (value >= 3600) {
    return `${(value / 60 / 60).toFixed(0)}h`
  } else if (value >= 60) {
    return `${(value / 60).toFixed(0)}m`
  }

  return `${value}s`
}

export const formatTime = (value: number) => {
  if (value < 3600) {
    return new Date(value * 1000).toISOString().substr(14, 5).replace(/^0+/, '')
  }
  return new Date(value * 1000).toISOString().substr(11, 8).replace(/^0+/, '')
}

type GenerateTickValueProps = {
  data: Array<{ x: number; y: number }>
  intervalSecs: number
}

export const generateTimeTickValues = ({
  data,
  intervalSecs,
}: GenerateTickValueProps) => {
  const max = Math.max(...data.map(o => o.x))
  let currentTick = 0
  const ticks = []

  while (currentTick < max - 3600) {
    currentTick += intervalSecs
    ticks.push(currentTick)
  }
  return ticks
}

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}
