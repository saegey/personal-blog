import { parseBikeSignupJSON } from '../bikesignupjson'
import data from '../__fixtures__/bikesignup.json'

describe('bikejsonsignup', () => {
  describe('parseBikeSignupJson', () => {
    it('should return formatted results', () => {
      expect(parseBikeSignupJSON(data)).toEqual([
        { name: 'Sam Peckham', time: '1:04:43.8', place: "1" },
        { name: 'Nate Hansen', time: '1:04:47.8', place: "2" },
        { name: 'Jesse Favia', time: '1:06:51.3', place: "3" },
        { name: 'Joshua Melanson', time: '1:10:22.6', place: "4" },
        { name: 'Leo Berk', time: '1:10:27.3', place: "5" },
        { name: 'Konner Hopkins', time: '1:10:44.3', place: "6" },
        { name: 'Anthony Ottinger', time: '1:10:47.0', place: "7" },
        { name: 'Ian Hansen', time: '1:12:00.0', place: "8" },
        { name: 'Adam Saegebarth', time: '1:12:43.0', place: "9" },
        { name: 'Kellen Hopkins', time: '1:13:03.3', place: "10" },
        { name: 'Robby Hansen', time: '1:24:18.8', place: "11" },
        { name: 'Ezequiel Andres', time: '1:46:59.2', place: "12" },
        { name: 'Joshua Assink', time: 'DNF', place: "13" },
      ])
    })
  })
})
