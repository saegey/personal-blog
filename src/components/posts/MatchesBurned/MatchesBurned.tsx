import React from 'react'

import MatchesHeading from './MatchesHeading'
import MatchesItem from './MatchesItem'
import ExpandableCard from '../../ExpandableCard'
import MaximizedContainer from '../../MaximizedContainer'

type Props = {
  data: Array<{
    averagePower: number
    totalJoules: number
    totalTime: number
    vals?: number[]
    startTime?: string
  }>
}

export const MatchesBurned = ({ data }: Props) => {
  const [isModalOpen, openModal] = React.useState(false)

  return (
    <>
      {isModalOpen && (
        <MaximizedContainer title={'Matches Burned'} openModal={openModal}>
          <>
            <MatchesHeading />
            {data.map((d, index: number) => {
              return <MatchesItem d={d} index={index} key={index} />
            })}
          </>
        </MaximizedContainer>
      )}
      <ExpandableCard
        title={'Matches Burned'}
        openModal={openModal}
        expandableOnMobile={false}
      >
        <>
          <MatchesHeading />
          {data.slice(0, 5).map((d, index: number) => {
            return <MatchesItem d={d} key={`matches-${index}`} index={index} />
          })}
        </>
      </ExpandableCard>
    </>
  )
}
