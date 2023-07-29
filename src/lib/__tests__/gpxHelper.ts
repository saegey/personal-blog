import {
  calcPowerZones,
  calcPedalBreakdown,
  timeInRed,
  totalWattsOverFtp,
  dateDiff,
  downsampleElevation,
  calcPowerZoneBuckets,
  calcNormalizedPower,
  calcPowerSlices,
  calcMatchesBurned,
  calcBestPowers,
  calcElevationGain,
  calcStoppage,
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

  describe('dateDiff', () => {
    it('returns time between two dates', () => {
      expect(
        dateDiff(
          new Date('1995-12-17T03:24:00'),
          new Date('1995-12-17T03:25:00')
        )
      ).toEqual({
        days: 0.0006944444444444445,
        hours: 0.016666666666666666,
        minutes: 1,
        seconds: 60,
      })
    })
  })

  describe('downsampleElevation', () => {
    it('decreases the number of points in the array', () => {
      expect(
        downsampleElevation([
          [0, 1, 1],
          [1, 1, 2],
          [2, 1, 3],
          [3, 1, 4],
        ])
      ).toEqual([
        { x: 0, y: '1', distance: 111178.14425440771, grade: 0 },
        { distance: 222356.28850881543, grade: 0, x: 1, y: '2' },
        { x: 2, y: '3', distance: 333534.4327632231, grade: 0 },
        {
          distance: 333534.4327632231,
          grade: 0,
          x: 3,
          y: '4',
        },
      ])
    })
  })

  describe('calcPowerZoneBuckets', () => {
    it('sums power into buckets by athletes power zones', () => {
      expect(
        calcPowerZoneBuckets({
          zones: [
            { powerLow: 0, powerHigh: 100, title: 'recovery' },
            { powerLow: 101, powerHigh: 200, title: 'endurance' },
          ],
          powers: [0, 50, 200, 250, 100],
        })
      ).toEqual([3, 2])
    })
  })

  describe('calcNormalizedPower', () => {
    it('calcs normalized power from array of power numbers', () => {
      expect(
        calcNormalizedPower([
          0,
          200,
          100,
          250,
          300,
          200,
          225,
          200,
          200,
          225,
          100,
          200,
          300,
          200,
          null,
          100,
          225,
          200,
          500,
          400,
          300,
          200,
          300,
          100,
          200,
        ])
      ).toEqual(174.16666666666666)
    })
  })

  describe('calcPowerSlices', () => {
    it('creates sums for all lengths in array', () => {
      expect(
        calcPowerSlices([200, 300, 300, 400, 100, 500, 300, 200, 300], 4)
      ).toEqual([1100, 1100, 1200, 1300, 1300, 1300])
    })
  })

  describe('calcMatchesBurned', () => {
    it('returns array of objects of detail info of time over ftp', () => {
      expect(
        calcMatchesBurned(
          [0, 100, 200, 300, 400, 500],
          [
            new Date('1995-12-17T03:24:00'),
            new Date('1995-12-17T03:24:01'),
            new Date('1995-12-17T03:24:02'),
            new Date('1995-12-17T03:24:03'),
            new Date('1995-12-17T03:24:04'),
            new Date('1995-12-17T03:24:05'),
          ]
        )
      ).toEqual([
        {
          averagePower: 400,
          index: 3,
          startTime: new Date('1995-12-17T03:24:03'),
          totalJoules: 1200,
          totalTime: 3,
          vals: [300, 400, 500],
        },
      ])
    })
  })

  describe('calcBestPowers', () => {
    it('should return power numbers', () => {
      expect(
        calcBestPowers([1, 2, 3, 4, 5], [100, 200, 200, 0, 500], true)
      ).toEqual({ '1': 500, '2': 350, '3': 300, '4': 250, entire: 250 })
    })
  })

  describe('calcElevationGain', () => {
    it('should calc elevation gain of a array of coordinates', () => {
      expect(
        calcElevationGain([
          [0, 0, 0],
          [1, 1, 1],
          [2, 2, 2],
          [3, 3, 3],
          [3, 3, 2],
        ])
      ).toEqual(3)
    })
  })

  describe('calcStoppage', () => {
    it('should return time of seconds when not moving', () => {
      expect(
        calcStoppage(
          [
            [0, 0, 0],
            [1, 1, 1],
            [2, 2, 2],
            [3, 3, 3],
          ],
          [
            new Date('1995-12-17T03:24:00'),
            new Date('1995-12-17T03:24:01'),
            new Date('1995-12-17T03:24:05'),
            new Date('1995-12-17T03:24:06'),
          ]
        )
      ).toEqual(4)
    })
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
