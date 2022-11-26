import {
  calcPowerZones,
  calcPedalBreakdown,
  timeInRed,
  totalWattsOverFtp,
} from '../gpxHelper'

describe('GpxHelper', () => {
  it('calculates power zones', () => {
    expect(calcPowerZones(100)).toEqual([
      { powerHigh: 0, powerLow: 0, title: 'Not pedaling', zone: 0 },
      { powerHigh: 56, powerLow: 1, title: 'Active Recovery', zone: 1 },
      { powerHigh: 76, powerLow: 56, title: 'Endurance', zone: 2 },
      { powerHigh: 91, powerLow: 76, title: 'Tempo', zone: 3 },
      { powerHigh: 106, powerLow: 91, title: 'Threshold', zone: 4 },
      { powerHigh: 121, powerLow: 106, title: 'VO2max', zone: 5 },
      { powerHigh: 0, powerLow: 121, title: 'Anaerobic Capacity', zone: 6 },
    ])
  })

  describe('calcPedalBreakdown', () => {
    it('should equal 50%', () => {
      expect(calcPedalBreakdown([0, 100, 0, 100])).toEqual({
        notPedaling: '0.50',
        pedaling: '0.50',
      })
    })
  })

  describe('timeInRed', () => {
    it('should equal 2', () => {
      expect(timeInRed({ powers: [0, 200, 50, 101], ftp: 100 })).toEqual(2)
    })
  })

  describe('totalWattsOverFtp', () => {
    it('should equal 200', () => {
      expect(
        totalWattsOverFtp({ powers: [0, 200, 150, 150, 50, 0], ftp: 100 })
      ).toEqual(200)
    })
  })
})
