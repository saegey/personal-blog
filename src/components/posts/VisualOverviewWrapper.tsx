import VisualOverview from './VisualOverview'

const MAPBOX_TOKEN = `${process.env.GATSBY_MAPBOX_TOKEN}`

type VisualOverviewWrapperProps = {
  elevationToAdd: number
  coordinates: any // Replace 'any' with a more specific type if possible, e.g., Array<[number, number]>
  elevationData: any
  yMin: number
}

const VisualOverviewWrapper = ({
  elevationToAdd,
  coordinates,
  elevationData,
  yMin,
}: VisualOverviewWrapperProps) => (
  <VisualOverview
    yMin={yMin}
    token={MAPBOX_TOKEN}
    elevationToAdd={elevationToAdd ? elevationData : 1000}
    coordinates={coordinates}
    elevationData={elevationData}
  />
)

export default VisualOverviewWrapper
