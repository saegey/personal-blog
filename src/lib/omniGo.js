const { formatTime } = require("./formatters")

function tsvJSON(tsv) {
  var lines = tsv.split("\n")

  var result = []

  var headers = lines[0].split("\t")

  for (var i = 1; i < lines.length; i++) {
    var obj = {}
    var currentline = lines[i].split("\t")

    for (var j = 0; j < headers.length; j++) {
      const data = currentline[j]
      if (data) {
        obj[camelize(headers[j])] = data.replace(/(\r\n|\n|\r)/gm, "")
      } else {
        obj[camelize(headers[j])] = data
      }
    }

    result.push(obj)
  }

  //return result; //JavaScript object
  return result //JSON
}

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, "")
}

const parseTSV = data => {
  const rawData = tsvJSON(data)
  const formattedData = []

  rawData.forEach(r => {
    if (r.name === undefined) return

    // console.log(r)
    const timeExplosion = r.time.split(" ").map(m => m.replace(/[^\d.-]/g, ""))
    timeExplosion[0] = timeExplosion[0] * 3600
    timeExplosion[1] = timeExplosion[1] * 60
    timeExplosion[2] = Number(timeExplosion[2])

    formattedData.push({
      place: r.place.replace(/\D/g, ""),
      name: r.name,
      time:
        r.time === "checkpoint missed"
          ? "00:00:00"
          : new Date(
              timeExplosion.reduce((partialSum, a) => partialSum + a, 0) * 1000
            )
              .toISOString()
              .substr(11, 8),
    })
  })

  return formattedData
}

exports.parseOmniTSV = parseTSV
