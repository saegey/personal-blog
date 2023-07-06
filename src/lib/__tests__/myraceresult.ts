import { formatJson } from '../myraceresult'
import data from '../__fixtures__/myraceresult.json'

describe('myraceresult', () => {
  describe('parse race result json', () => {
    it('should return formatted results', () => {
      expect(formatJson(data)).toEqual([
        { name: 'Stephen Mull', time: '4:04:57.1', place: '1' },
        { name: 'Aris Sophocles', time: '4:09:43.7', place: '2' },
        { name: 'Daniel Lincoln', time: '4:11:40.6', place: '3' },
        { name: 'Lewis Whiley', time: '4:13:07.6', place: '4' },
        { name: 'Kenneth Rizer', time: '4:18:06.5', place: '5' },
        { name: 'Zach Winter', time: '4:18:06.7', place: '7' },
        { name: 'Ryan Malm', time: '4:19:09.8', place: '8' }
      ])
    })
  })
})
