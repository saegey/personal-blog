// const fs = require("fs")

function getPlace(line) {
  return line.split(" ")[0]
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getName(line) {
  const parts = line.split(" ")
  const name = []
  for (let i = 2; i < parts.length; i++) {
    if (isNaN(parts[i])) {
      name.push(capitalize(parts[i].toLowerCase()))
    } else {
      break
    }
  }
  return name.join(" ")
}

function parse(file) {
  var lines = file.split("\n")
  const results = []
  lines.forEach(l => {
    // console.log(l)
    const place = getPlace(l)
    if (place === "") return
    results.push({
      place,
      name: place !== "DNF" ? getName(l) : getName(l).split("-")[0].trim(),
      time: place !== "DNF" ? getTotalTime(l) : "00:00:00",
    })
  })
  return results
}

function getTotalTime(line) {
  return line.split(" ").slice(-1)[0]
}

exports.parse = parse

// const data = fs.readFileSync(
//   "./src/posts/rpi-2022-stage-1/rpi-stage-1-results.txt",
//   "utf8"
// )

// // tsvJSON(data)
// console.log(JSON.stringify(parse(data)))
// return data
