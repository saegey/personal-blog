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
    elevationData={elevationData}
  />
)

export default VisualOverviewWrapper
