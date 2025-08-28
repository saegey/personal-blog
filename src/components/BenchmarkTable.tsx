import Table from "./common/Table"

export type BenchRow = {
  env: string
  format: 'FIT' | 'GPX'
  mean: number
  p50: number
  p95: number
  min: number
  max: number
}
export function BenchmarkTable({ rows }: { rows: BenchRow[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Environment</th><th>Format</th><th>Mean</th><th>p50</th><th>p95</th><th>Min</th><th>Max</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.env}>
            <td><strong>{r.env}</strong></td>
            <td><strong>{r.format}</strong></td>
            <td>{r.mean}&nbsp;ms</td>
            <td>{r.p50}&nbsp;ms</td>
            <td>{r.p95}&nbsp;ms</td>
            <td>{r.min}&nbsp;ms</td>
            <td>{r.max}&nbsp;ms</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}