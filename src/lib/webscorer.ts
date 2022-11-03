import { camelize } from '../lib/formatters'

type ResultHeadings = {
  name: string
  Place: string
  time: string
}

type OnlyKeys = keyof ResultHeadings

const tsvJSON = (tsv: string) => {
  const lines = tsv.split('\n')
  const result = []
  const headers = lines[0].split('\t')

  for (let i = 1; i < lines.length; i++) {
    var obj: ResultHeadings = { name: '', Place: '', time: '' }
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

type FormattedResult = {
  place: string
  name: string
  time: string
}

export const parseTSV = (data: string) => {
  const rawData = tsvJSON(data)
  const formattedData: FormattedResult[] = []

  rawData.forEach(r => {
    formattedData.push({
      place: r['Place'],
      name: r.name,
      time: r.time,
    })
  })

  return formattedData
}
