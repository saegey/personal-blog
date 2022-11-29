import {
  camelize,
  formatSeconds,
  formatTime,
  generateTimeTickValues,
} from '../formatters'

describe('formatters', () => {
  describe('formatSeconds', () => {
    it('should return value in min', () => {
      expect(formatSeconds(10)).toEqual('10s')
    })

    it('should return value in min', () => {
      expect(formatSeconds(60)).toEqual('1m')
    })

    it('should return value in hours', () => {
      expect(formatSeconds(3600)).toEqual('1h')
    })
  })

  describe('formatTime', () => {
    it('should return 600 secs in iso style time', () => {
      expect(formatTime(600)).toEqual('10:00')
    })

    it('should return 3600 secs in iso style time', () => {
      expect(formatTime(3600)).toEqual('1:00:00')
    })
  })

  describe('generateTimeTickValues', () => {
    it('should generate array of numbers for graph timeline', () => {
      expect(
        generateTimeTickValues({
          data: [
            { x: 0, y: 20 },
            { x: 3600, y: 40 },
            { x: 7200, y: 40 },
          ],
          intervalSecs: 600,
        })
      ).toEqual([600, 1200, 1800, 2400, 3000, 3600])
    })
  })

  describe('camelize', () => {
    it('should camelize case a string', () => {
      expect(camelize(' hello ')).toEqual('Hello')
    })
  })
})
