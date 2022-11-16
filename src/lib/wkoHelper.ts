export const parseSegmentsFromXml = (xmlDoc: XMLDocument) => {
  const laps = []
  const segments = xmlDoc.getElementsByTagName('segment')

  for (let i = 0; i < segments.length; i++) {
    laps.push({
      beginningTime: Number(
        segments[i].getElementsByTagName('beginning')[0].textContent
      ),
      segmentDuration: Number(
        segments[i].getElementsByTagName('duration')[0].textContent
      ),
      segmentDistance: Number(
        segments[i].getElementsByTagName('dist')[0].textContent
      ),
      segmentDurationStopped: Number(
        segments[i].getElementsByTagName('durationstopped')[0].textContent
      ),
    })
  }
  return laps
}
