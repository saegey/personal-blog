const formatSeconds = (value: number) => {
  if (value >= 3600) {
    return `${value / 60 / 60}h`
  } else if (value >= 60) {
    return `${value / 60}m`
  }

  return `${value}s`
}

const formatTime = (value: number) => {
  if (value < 3600) {
    return new Date(value * 1000).toISOString().substr(14, 5)
  }
  return new Date(value * 1000).toISOString().substr(11, 8)
}

type GenerateTickValueProps = {
	data: [{x: number, y: number}],
	intervalSecs: number
}

const generateTimeTickValues = ({data, intervalSecs}: GenerateTickValueProps)  => {
  const max = Math.max(...data.map(o => o.x))
  let currentTick = 0
  const ticks = []

  while (currentTick < max - 3600) {
    currentTick += intervalSecs
    ticks.push(currentTick)
  }
  return ticks
}

type GenerateElevationTickValueProps = {
	data: [{x: number, y: number}],
	intervalSecs: number,
	unit: string
}

const generateElevatioinTickValues = ({data, intervalSecs, unit}: GenerateElevationTickValueProps) => {
  const max =
    unit === "metric"
      ? Math.max(...data.map(o => o.y))
      : Math.max(...data.map(o => o.y)) * 3.280839895
  const min =
    unit === "metric"
      ? Math.min(...data.map(o => o.y))
      : Math.min(...data.map(o => o.y)) * 3.280839895

  let currentTick = (Math.floor(min / 1000) + 1) * 1000
  const ticks = []

  while (currentTick < max) {
    if (currentTick < max) {
      ticks.push(currentTick)
    }
    currentTick += intervalSecs
  }
  ticks.push(currentTick)

  return ticks
}

export const camelize = (str: string) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
}

export {
  formatSeconds,
  formatTime,
  generateTimeTickValues,
  generateElevatioinTickValues,
}