import { camelize, formatSeconds, formatTime } from '../formatters'

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

  describe('camelize', () => {
    it('should camelize case a string', () => {
      expect(camelize(' hello ')).toEqual('Hello')
    })
  })
})
