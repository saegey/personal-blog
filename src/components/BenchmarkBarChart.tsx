import { type ReactNode, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

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

type Props = { rows?: BenchDatum[]; title?: string; subtitle?: string }
const milliseconds = (value: number) => `${value.toFixed(2)} ms`

export default function BenchBarChartThemeUI({ rows, title, subtitle }: Props) {
  const [metric, setMetric] = useState<MetricKey>('mean')
  const data = useMemo(() => (rows ?? []).map(row => ({ ...row, value: row[metric] })), [metric, rows])

  return (
    <section className="my-10 border-y border-line py-6 sm:py-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="eyebrow text-ink">Benchmark</p>
          <h2 className="mt-2 font-serif text-3xl leading-tight tracking-[-0.025em]">{title ?? 'GPX vs FIT — Parse Time Benchmarks'}</h2>
          {subtitle && <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">{subtitle}</p>}
        </div>
        <label className="font-condensed text-sm font-medium uppercase tracking-label">
          Metric
          <select value={metric} onChange={event => setMetric(event.target.value as MetricKey)} className="ml-3 border-b border-ink bg-transparent px-1 py-1 font-serif text-base normal-case tracking-normal outline-none">
            {METRICS.map(option => <option key={option.key} value={option.key}>{option.label}</option>)}
          </select>
        </label>
      </div>
      <div className="mt-6 h-72 w-full sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 24, right: 8, bottom: 20, left: -16 }}>
            <CartesianGrid vertical={false} stroke="#dedede" />
            <XAxis dataKey="env" interval={0} angle={-18} textAnchor="end" height={70} tick={{ fontSize: 12, fill: '#666666' }} axisLine={{ stroke: '#dedede' }} tickLine={false} />
            <YAxis tickFormatter={value => `${value} ms`} tick={{ fontSize: 12, fill: '#666666' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value: number) => milliseconds(value)} contentStyle={{ border: '1px solid #dedede', background: '#fafafa', borderRadius: 0, fontFamily: 'IBM Plex Sans Condensed, sans-serif' }} />
            <Bar dataKey="value" name={`${metric.toUpperCase()} (ms)`} fill="#141414">
              <LabelList dataKey="value" formatter={(value: ReactNode) => milliseconds(Number(value))} position="top" style={{ fontSize: 10, fill: '#666666' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-4 font-condensed text-sm leading-relaxed text-muted">Values are milliseconds. The same activity file was used across each environment.</p>
    </section>
  )
}
