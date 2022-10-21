// const fs = require("fs")

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

// const data = fs.readFileSync(
//   "./content/results/webscorer/gfe-2022-results.txt",
//   "utf8"
// )

const parseTSV = data => {
  const rawData = tsvJSON(data)
  const formattedData = []

  rawData.forEach(r => {
    formattedData.push({
      place: r["Place"],
      name: r.name,
      time: r.time,
    })
  })

  return formattedData
}

exports.parseTSV = parseTSV
