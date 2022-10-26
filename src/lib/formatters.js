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
  let currentTick = 0
  const ticks = []

  while (currentTick < max - 3600) {
    currentTick += intervalSecs
    ticks.push(currentTick)
  }
  return ticks
}

const generateElevatioinTickValues = (data, intervalSecs) => {
  const max = Math.max(...data.map(o => o.y))
  const min = Math.min(...data.map(o => o.y))

  // console.log(min, max)
  let currentTick = Math.floor(min / 500) * 500
  console.log(currentTick, max)
  const ticks = []

  while (currentTick < max) {
    if (currentTick < max) {
      ticks.push(currentTick)
    }
    currentTick += intervalSecs
  }
  ticks.push(currentTick)
  console.log(ticks)
  return ticks
}

module.exports = {
  formatSeconds,
  formatTime,
  generateTimeTickValues,
  generateElevatioinTickValues,
}
