const tj = require("@tmcw/togeojson")
const fs = require("fs")
// node doesn't have xml parsing or a dom. use xmldom
const DOMParser = require("xmldom").DOMParser

const gpx = new DOMParser().parseFromString(
  fs.readFileSync("./RPI_Queen_Stage_3_Baked_.gpx", "utf8")
)

const converted = tj.gpx(gpx)
console.log(JSON.stringify(converted))
