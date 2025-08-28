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

// Default dataset (times in milliseconds); can be overridden via props

const METRICS = [
  { key: 'mean', label: 'Mean' },
  { key: 'p50', label: 'p50 (median)' },
  { key: 'p95', label: 'p95' },
  { key: 'min', label: 'Min' },
  { key: 'max', label: 'Max' },
] as const

type MetricKey = (typeof METRICS)[number]['key']

export type BenchDatum = {
  env: string
  format: string
  mean: number
  p50: number
  p95: number
  min: number
  max: number
}

type Props = {
  rows?: BenchDatum[]
  title?: string
  subtitle?: string
}

const ms = (v: number) => `${v.toFixed(2)} ms`

export default function BenchBarChartThemeUI({ rows, title, subtitle }: Props) {
  const [metric, setMetric] = useState<MetricKey>('mean')
  const theme = useThemeUI()

  const data = useMemo(
    () =>
      (rows ?? []).map(d => ({ ...d, value: (d as any)[metric] as number })),
    [metric, rows],
  )

  const headingText = title ?? 'GPX vs FIT — Parse Time Benchmarks'
  const subtitleText =
    subtitle ??
    'Comparing mean/p50/p95/min/max parse times across Go, Node.js, Ruby, and Python for the same activity.'

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        mx: 'auto',
        p: [0, 3],
        borderRadius: 4,
        border: ['', '2px solid'],
        borderColor: 'border',
      }}
    >
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
            {headingText}
          </Heading>
          <Text sx={{ color: 'textSubtle', fontSize: 1, fontFamily: 'body' }}>
            {subtitleText}
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
