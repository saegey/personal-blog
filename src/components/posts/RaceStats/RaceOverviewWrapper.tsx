import React from 'react'
import RaceOverview from './RaceOverview'

type WrapperProps = {
  // Raw stats JSON object (from File.fields.data)
  data: Record<string, any>
  selectedFields?: string[]
}

// Returns the latest non-zero numeric value; skips trailing zeros
const getLatestValue = (
  obj: Record<string, any> | undefined,
): number | undefined => {
  if (!obj || typeof obj !== 'object') return undefined
  const keys = Object.keys(obj)
    .map(k => Number(k))
    .filter(n => Number.isFinite(n))
    .sort((a, b) => b - a)
  for (const k of keys) {
    const raw = obj[String(k)]
    const val = typeof raw === 'number' ? raw : Number(raw)
    if (Number.isFinite(val) && val > 0) return val
  }
  return undefined
}

const RaceOverviewWrapper: React.FC<WrapperProps> = ({
  data,
  selectedFields = [],
}) => {
  // Distance: last simplified distance in meters -> km
  const distances: number[] =
    data?.SimplifiedDistances || data?.simplifiedDistances || []
  const distanceKm =
    distances.length > 0 ? Number(distances[distances.length - 1]) / 1000 : 0
  console.log(data.PowerAnalysis)
  const shaped = {
    elevationGain: Number(data?.ElevationGain ?? data?.elevationGain ?? 0),
    distance: distanceKm,
    normalizedPower: Number(
      data?.NormalizedPower ?? data?.normalizedPower ?? 0,
    ),
    heartAnalysis: { entire: getLatestValue(data?.HeartAnalysis) ?? 0 },
    tempAnalysis: { entire: getLatestValue(data?.TempAnalysis) ?? 0 },
    powerAnalysis: { entire: getLatestValue(data?.PowerAnalysis) ?? 0 },
    cadenceAnalysis: { entire: getLatestValue(data?.CadenceAnalysis) ?? 0 },
    elapsedTime: {
      seconds: Number(data?.ElapsedTime ?? data?.elapsedTime ?? 0),
    },
    stoppedTime: Number(data?.StoppedTime ?? data?.stoppedTime ?? 0),
    timeInRed: Number(data?.TimeInRed ?? data?.timeInRed ?? 0),
  }

  return <RaceOverview data={shaped as any} selectedFields={selectedFields} />
}

export default RaceOverviewWrapper
