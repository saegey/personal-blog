const formatSeconds = value => {
  if (value >= 3600) {
    return `${value / 60 / 60}h`
  } else if (value >= 60) {
    return `${value / 60}m`
  }

  return `${value}s`
}

const formatTime = value => {
  if (value < 3600) {
    return new Date(value * 1000).toISOString().substr(14, 5)
  }
  return new Date(value * 1000).toISOString().substr(11, 8)
}

const generateTimeTickValues = (axis, data, intervalSecs) => {
  const max = Math.max(...data.map(o => o.x))
  const min = 0
  let currentTick = 0
  const ticks = []

  while (currentTick < max) {
    currentTick += intervalSecs
    ticks.push(currentTick)
  }
  return ticks
}

const generateElevatioinTickValues = (axis, data, intervalSecs) => {
  const max = Math.max(...data.map(o => o.y))
  const min = Math.min(...data.map(o => o.y))

  let currentTick = Math.floor(min / 500) * 500
  const ticks = []

  while (currentTick < max) {
    currentTick += intervalSecs
    if (currentTick < max) {
      ticks.push(currentTick)
    }
  }
  return ticks
}

export {
  formatSeconds,
  formatTime,
  generateTimeTickValues,
  generateElevatioinTickValues,
}
