export const themeTemplate = (theme: any) => {
  return {
    fontFamily: theme.fonts.body,
    fontSize: 15,
    tooltip: {
      container: {
        background: theme.colors.background,
        color: theme.colors.text,
        fontSize: 12,
      },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {},
    },
    grid: {
      line: {
        stroke: theme.colors?.graphGrid,
        strokeWidth: 1,
        zIndex: -100000,
      },
    },
    axis: {
      domain: {
        line: {
          stroke: theme.colors?.graphGrid,
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fontSize: 15,
          fill: theme.colors?.text,
        },
      },
      ticks: {
        line: {
          stroke: theme.colors?.text,
          strokeWidth: 1,
        },
        text: {
          fontSize: 14,
          fill: theme.colors?.text,
        },
      },
    },
    legends: {
      title: {
        text: {
          fontSize: 18,
          fill: theme.colors?.text,
          fontFamily: theme.fonts.body,
        },
      },
      text: {
        fontSize: 18,
        fill: theme.colors?.text,
        fontFamily: theme.fonts.body,
      },
      ticks: {
        line: {},
        text: {
          fontSize: 18,
          fill: theme.colors?.text,
          fontFamily: theme.fonts.body,
        },
      },
    },
    ticks: {
      text: { fontSize: 18, fontFamily: theme.fonts.body },
    },
  }
}
