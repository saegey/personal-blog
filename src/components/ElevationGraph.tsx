import { ResponsiveLine } from '@nivo/line';
import { useThemeUI, Box } from 'theme-ui';

import {
  formatSeconds,
  generateElevatioinTickValues,
  generateTimeTickValues,
  formatTime,
} from '../lib/formatters';
import { GraphProps } from '../common/types';
import ThemeContext from '../context/ThemeContext';

const ElevationGraph = ({ data, unit }: GraphProps) => {
  const { theme } = useThemeUI();
  const graphColor = theme.colors?.text

  return (
    <ResponsiveLine
      yScale={{
        type: 'linear',
        min:
          unit === 'metric'
            ? Math.min(...data.map((o) => o.y)) - 152.4
            : Math.min(...data.map((o) => o.y)) * 3.280839895 - 500,
        // min: "auto",
        max:
          unit === 'metric'
            ? Math.floor(Math.max(...data.map((o) => o.y)) / 500) * 500 + 500
            : (Math.floor(Math.max(...data.map((o) => o.y)) / 500) * 500 + 500)
              * 3.280839895,
        stacked: false,
        reverse: false,
      }}
      xScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
      }}
      margin={{
        top: 10, right: 0, bottom: 25, left: 40,
      }}
      curve="natural"
      pointSize={0}
      useMesh
      enableArea
      areaBaselineValue={
        unit === 'metric'
          ? Math.min(...data.map((o) => o.y)) - 152.4
          : Math.min(...data.map((o) => o.y)) * 3.280839895 - 500
      }
      areaOpacity={0.3}
      colors={[theme.colors.text]}
      axisBottom={{
        format: formatSeconds,
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        // legend: "Time",
        legendOffset: 30,
        legendPosition: 'middle',
        // tickCount: 5,
        tickValues: generateTimeTickValues({ data, intervalSecs: 3600 }),
      }}
      enableSlices="x"
      sliceTooltip={({ slice }) => (
        <div
          style={{
            background: theme.colors.text,
            padding: '9px 12px',
            fontFamily: theme.fonts.body,
            letterSpacing: '.4px',
            borderRadius: '4px',
          }}
        >
          {slice.points.map((point) => (
            <div
              key={point.id}
              style={{
                color: theme.colors.background,
                padding: '3px 0',
              }}
            >
              <div style={{ fontWeight: 300 }}>
                {formatTime(point.data.x)}
              </div>
              <div style={{ fontWeight: 600 }}>
                {point.data.y.toLocaleString()}
                {' '}
                {unit === 'metric' ? 'm' : 'ft'}
              </div>
            </div>
          ))}
        </div>
      )}
      axisLeft={{
        format: (val) => `${val}`,
        orient: 'left',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        tickCount: 2,
        // legend: "Elevation",
        legendOffset: 0,
        legendPosition: 'middle',
        // tickValues: [0, 1000, 2000],
        tickValues: generateElevatioinTickValues({
          data,
          intervalSecs: unit === 'metric' ? 500 : 1000,
          unit,
        }),
      }}
      theme={{
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
            stroke: graphColor,
            strokeWidth: 1,
            zIndex: -100000,
          },
        },
        axis: {
          domain: {
            line: {
              stroke: graphColor,
              strokeWidth: 1,
            },
          },
          legend: {
            text: {
              fontSize: 15,
              fill: graphColor,
            },
          },
          ticks: {
            line: {
              stroke: graphColor,
              strokeWidth: 1,
            },
            text: {
              fontSize: 14,
              fill: graphColor,
            },
          },
        },
        legends: {
          title: {
            text: {
              fontSize: 18,
              fill: graphColor,
              fontFamily: theme.fonts.body,
            },
          },
          text: {
            fontSize: 18,
            fill: graphColor,
            fontFamily: theme.fonts.body,
          },
          ticks: {
            line: {},
            text: {
              fontSize: 18,
              fill: graphColor,
              fontFamily: theme.fonts.body,
            },
          },
        },
        ticks: {
          text: { fontSize: 18, fontFamily: theme.fonts.body },
        },
      }}
      layers={[
        null,
        'markers',
        'axes',
        'areas',
        'crosshair',
        'lines',
        null,
        'slices',
        'mesh',
        'legends',
      ]}
      data={[
        {
          id: 'elevation',
          data:
            unit === 'metric'
              ? data
              : data.map((d) => ({
                x: d.x,
                y: (d.y * 3.280839895).toFixed(0),
              })),
        },
      ]}
    />
  );
}

const ElevationGraphWrapper = ({ data }: { data: GraphProps["data"]}) => {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <Box
          sx={{
            height: ['150px', '100px', '150px'],
            fontFamily: 'body',
            marginY: '20px',
          }}
        >
          <ElevationGraph data={data} unit={theme.unitOfMeasure} />
        </Box>
      )}
    </ThemeContext.Consumer>
  );
}

export default ElevationGraphWrapper;
