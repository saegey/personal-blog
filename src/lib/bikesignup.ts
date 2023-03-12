function getPlace(line: string) {
  return line.split(',')[0]
}

// function capitalize(str: string) {
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }

function getName(line: string) {
  const parts = line.split(',')
  // const name = []
  // for (let i = 2; i < parts.length; i++) {
  //   const val = Number(parts[i])
  //   if (isNaN(val)) {
  //     name.push(capitalize(new String(parts[i]).toLowerCase()))
  //   } else {
  //     break
  //   }
  // }
  if (parts[2]) {
    return parts[2].replace(/['"]+/g, '')
  } else {
    return ''
  }

  // return name.join(' ')
}

type ResultItem = {
  place: string
  name: string
  time: string
}

export const parseBikeSignup = (file: string) => {
  var lines = file.split('\n')

  const results: ResultItem[] = []
  lines.forEach(l => {
    const place = getPlace(l)
    if (place === 'Place' || place === '') return
    results.push({
      place,
      name: getName(l),
      time: getTotalTime(l)
    })
  })
  return results
}

function getTotalTime(line: string) {
  return line.split(',')[9]
}
