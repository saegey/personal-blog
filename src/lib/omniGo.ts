import { camelize } from '../lib/formatters'

type ResultHeadings = {
  name: string
  place: string
  time: string
}

type FormattedResult = {
  place: string
  name: string
  time: string
}

type OnlyKeys = keyof ResultHeadings

const tsvJSON = (tsv: string) => {
  const lines = tsv.split('\n')
  const result = []
  const headers = lines[0].split('\t')

  for (let i = 1; i < lines.length; i++) {
    var obj: ResultHeadings = { name: '', place: '', time: '' }
    var currentline = lines[i].split('\t')

    for (var j = 0; j < headers.length; j++) {
      const data = currentline[j]
      if (data) {
        obj[camelize(headers[j]) as OnlyKeys] = data.replace(
          /(\r\n|\n|\r)/gm,
          ''
        )
      } else {
        obj[camelize(headers[j]) as OnlyKeys] = data
      }
    }

    result.push(obj)
  }
  return result
}

export const parseOmniTSV = (data: string) => {
  const rawData = tsvJSON(data)
  const formattedData: FormattedResult[] = []

  rawData.forEach(r => {
    if (r.name === undefined) return

    const timeExplosion = r.time
      .split(' ')
      .map(m => m.replace(/[^\d.-]/g, ''))
      .map(m => Number(m))

    timeExplosion[0] = timeExplosion[0] * 3600
    timeExplosion[1] = timeExplosion[1] * 60
    timeExplosion[2] = timeExplosion[2]

    formattedData.push({
      place: r.place.replace(/\D/g, ''),
      name: r.name,
      time:
        r.time === 'checkpoint missed'
          ? '00:00:00'
          : new Date(
              timeExplosion.reduce((partialSum, a) => partialSum + a, 0) * 1000
            )
              .toISOString()
              .substr(11, 8),
    })
  })

  return formattedData
}
