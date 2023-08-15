import VisualOverview from '@saegey/posts.visual-overview'

const MAPBOX_TOKEN = `${process.env.GATSBY_MAPBOX_TOKEN}`

const VisualOverviewWrapper = ({
  elevationToAdd: number,
  coordinates,
  elevationData,
  yMin
}) => (
  <VisualOverview
    yMin={yMin}
    token={MAPBOX_TOKEN}
    elevationToAdd={1000}
    coordinates={coordinates}
    elevationData={{
      downsampleRate: 60,
      data: elevationData,
      axisXTickValues: {
        imperial: [[20, 40, 60, 80]],
        metric: [[20, 40, 60, 80, 100, 120]],
      },
      axisLeftTickValues: {
        imperial: [[1000, 2000, 3000]],
        metric: [[250, 500, 750, 1000]],
      },
    }}
  />
)

export default VisualOverviewWrapper
