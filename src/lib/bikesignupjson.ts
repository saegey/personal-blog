type Headings = {
  key: string,
  name: string,
  style: string,
  hidden: boolean
}

type Result = Array<string | number>

type Payload = {
  headings: Array<Headings>,
  resultSet: {
    results: Array<Result>
  }
}

type Row = {
  race_placement: number,
  age_performance_percentage: string,
  bib_num: string,
  name: string,
  profile_image_url: string,
  gender: string,
  city: string,
  state: string,
  countrycode: string,
  split_432771: string,
  split_432772: string
  split_432773: string,
  clock_time: string,
  chip_time: string,
  avg_pace: string
  age: number,
  division_place: string,
  division: string
}

export const parseBikeSignupJSON = (file: Payload) => {
  const headings = file.headings.map(f => f.key)
  const rows: Array<Row> = []
  file.resultSet.results.forEach(result => {
    const obj: any = {}
    headings.map((h, i) => {
      obj[h] = String(result[i])
      return obj
    })
    rows.push(obj)
  })

  return rows.map(r => {
    return {
      name: r.name,
      time: r.clock_time,
      place: r.race_placement
    }
  })
}
