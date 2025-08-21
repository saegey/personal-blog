import { ThemeUICSSObject } from 'theme-ui'

type ThemeLike = { colors?: Record<string, any> }

export const buildChartTheme = (theme: ThemeLike) => {
  const colors = theme.colors || {}

  const tick = {
    fill: String(colors.textMuted ?? '#777777'),
    fontSize: 12,
  }

  const axisLabel = {
    fill: String(colors.textMuted ?? '#777777'),
    fontSize: 13,
    fontWeight: 600
  }

  const axisLine = {
    stroke: String(colors.cardBorderColor ?? colors.primaryMuted ?? '#e1e1e1'),
  }

  const labelFill = String(colors.text ?? '#212121')
  const series = {
    line: String(colors.primary ?? '#000000'),
  }
  const reference = {
    line: String(
      (colors.gray && colors.gray[4]) ?? colors.primaryMuted ?? '#bbbbbb',
    ),
  }

  const tooltip = {
    box: {
      bg: 'muted',
      p: 2,
      borderRadius: 'md',
      boxShadow: 'card',
    } as ThemeUICSSObject,
    text: { fontSize: 1 } as ThemeUICSSObject,
    valueText: { fontSize: 1, fontWeight: 600 } as ThemeUICSSObject,
  }

  return { tick, axisLine, labelFill, series, reference, tooltip, axisLabel }
}

export type ChartTheme = ReturnType<typeof buildChartTheme>
