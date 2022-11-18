// import { camelize } from './formatters'

type ResultItem = {
  place: string
  name: string
  time: string
}

export const parseTurboreg = (file: string) => {
  var lines = file.split('\n')
  const results: ResultItem[] = []
  lines.forEach(l => {
    const cols = l.split('\t')

    if (cols[0] === '') {
      return
    }
    results.push({
      place: cols[0].replace('.', ''),
      name: cols[2] ? cols[2] : '',
      time: cols.slice(-1)[0],
    })
  })
  return results
}
