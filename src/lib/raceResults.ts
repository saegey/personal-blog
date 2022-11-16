function getPlace(line: string) {
  return line.split(' ')[0]
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getName(line: string) {
  const parts = line.split(' ')
  const name = []
  for (let i = 2; i < parts.length; i++) {
    const val = Number(parts[i])
    if (isNaN(val)) {
      name.push(capitalize(new String(parts[i]).toLowerCase()))
    } else {
      break
    }
  }
  return name.join(' ')
}

type ResultItem = {
  place: string
  name: string
  time: string
}

export const parse = (file: string) => {
  var lines = file.split('\n')
  const results: ResultItem[] = []
  lines.forEach(l => {
    const place = getPlace(l)
    if (place === '') return
    results.push({
      place,
      name: place !== 'DNF' ? getName(l) : getName(l).split('-')[0].trim(),
      time: place !== 'DNF' ? getTotalTime(l) : '00:00:00',
    })
  })
  return results
}

function getTotalTime(line: string) {
  return line.split(' ').slice(-1)[0]
}
