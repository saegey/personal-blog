export const formatJson = (file: any) => {
  const headings: any = file.list.Fields.map((f: any) => f.Label)
  const rows: Array<any> = []
  file.data.forEach((result: any) => {
    const obj: any = {}
    headings.map((h: string, i: number) => {
      obj[h] = String(result[i + 1])
      return obj
    })
    rows.push(obj)
  })

  return rows
    .map(r => {
      if (r['Name'] === 'undefined') {
        return null
      } else {
        return {
          name: r['Name'],
          time: r['Time'],
          place: r['Cat Place'],
        }
      }
    })
    .filter(r => r)
}
