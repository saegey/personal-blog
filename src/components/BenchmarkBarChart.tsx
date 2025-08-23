/** @jsxImportSource theme-ui */
import { useMemo, useState } from 'react'
import { Box, Flex, Select, Heading, Text, useThemeUI } from 'theme-ui'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts'

// Data parsed from the user's table (times are in milliseconds)
const RAW = [
  {
    env: 'Go 1.25.0 — tormoder/fit',
    format: 'FIT',
    mean: 17.0,
    p50: 16.8,
    p95: 18.1,
    min: 16.1,
    max: 21.7,
  },
  {
    env: 'Go 1.25.0 - muktihari/fit',
    format: 'FIT',
    mean: 25.53,
    p50: 25.31,
    p95: 26.95,
    min: 22.61,
    max: 27.24,
  },
  {
    env: 'Go 1.25.0 — tkrajina/gpxgo',
    format: 'GPX',
    mean: 257.5,
    p50: 257.6,
    p95: 261.2,
    min: 252.3,
    max: 264.4,
  },
  {
    env: 'Node.js — fit-file-parser',
    format: 'FIT',
    mean: 147.68,
    p50: 147.86,
    p95: 153.48,
    min: 135.27,
    max: 168.58,
  },
  {
    env: 'Node.js — fast-xml-parser',
    format: 'GPX',
    mean: 336.05,
    p50: 335.64,
    p95: 340.34,
    min: 329.63,
    max: 350.04,
  },
  {
    env: 'Python — fitdecode',
    format: 'FIT',
    mean: 1313.39,
    p50: 1313.08,
    p95: 1331.19,
    min: 1286.05,
    max: 1340.09,
  },
  {
    env: 'Python — fitparse',
    format: 'FIT',
    mean: 3267.73,
    p50: 3263.11,
    p95: 3303.35,
    min: 3242.8,
    max: 3307.37,
  },
  {
    env: 'Python — gpxpy (points)',
    format: 'GPX',
    mean: 987.3,
    p50: 983.28,
    p95: 1081.28,
    min: 911.15,
    max: 1089.71,
  },
]

const METRICS = [
  { key: 'mean', label: 'Mean' },
  { key: 'p50', label: 'p50 (median)' },
  { key: 'p95', label: 'p95' },
  { key: 'min', label: 'Min' },
  { key: 'max', label: 'Max' },
] as const

type MetricKey = (typeof METRICS)[number]['key']

const ms = (v: number) => `${v.toFixed(2)} ms`

export default function BenchBarChartThemeUI() {
  const [metric, setMetric] = useState<MetricKey>('mean')
  const theme = useThemeUI()

  const data = useMemo(
    () => RAW.map(d => ({ ...d, value: d[metric] })),
    [metric],
  )

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', pt: 2 }}>
      <Flex
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 3,
          flexWrap: 'wrap',
        }}
      >
        <Box>
          <Heading as="h2" sx={{ fontSize: 3, mb: 1, fontFamily: 'body' }}>
            GPX vs FIT — Parse Time Benchmarks
          </Heading>
          <Text sx={{ color: 'textSubtle', fontSize: 1, fontFamily: 'body' }}>
            Comparing mean/p50/p95/min/max parse times across Go, Node.js, and
            Python for the same activity.
          </Text>
        </Box>
        <Flex sx={{ alignItems: 'center', gap: 2 }}>
          <Text sx={{ fontSize: 1, fontWeight: 600 }}>Metric:</Text>
          <Select
            value={metric}
            onChange={e => setMetric(e.target.value as MetricKey)}
            sx={{ fontSize: 1 }}
          >
            {METRICS.map(m => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      <Box sx={{ height: 480, width: '100%', mt: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="env"
              interval={0}
              angle={-18}
              textAnchor="end"
              height={70}
              tick={{ fontSize: 12 }}
            />
            <YAxis tickFormatter={v => `${v} ms`} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: any, _name, payload) => [
                ms(value as number),
                payload?.payload?.format,
              ]}
            />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="value"
              name={`${metric.toUpperCase()} (ms)`}
              fill={theme?.theme?.colors?.text as string}
            >
              <LabelList
                dataKey={(d: any) => ms(d.value)}
                position="top"
                style={{ fontSize: 10 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      <Text sx={{ mt: 2, color: 'textSubtle', fontSize: 0 }}>
        Note: Values are in milliseconds. The same activity file was used across
        all environments. Differences reflect both format efficiency (FIT vs
        GPX) and library/runtime overhead.
      </Text>
    </Box>
  )
}
