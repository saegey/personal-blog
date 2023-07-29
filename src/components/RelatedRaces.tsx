import { Link as GatsbyLink } from 'gatsby'
import { Text, Box, Card, Link, Image, Flex } from 'theme-ui'
import { IGatsbyImageData, getImage } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MyImageProps } from '../common/types'

const MyImage = Image as any as (props: MyImageProps) => JSX.Element

type Props = {
  items: [
    {
      slug: string
      title: string
      date: string
      normalizedPower: number
      headerImage: IGatsbyImageData | undefined
      timeInRed: string
      location: string
    }
  ]
}

const RelatedRaces = ({ items }: Props) => {
  return (
    <>
      <Box sx={{ marginBottom: ['10px', '16px', '16px'] }}>
        <Text as="h2" variant="resultsHeading">
          Related Races
        </Text>
      </Box>
      {items.map((i, index) => {
        const headerImage = getImage(i.headerImage)
        return (
          <Link
            to={`/${i.slug}`}
            rel="related"
            sx={{ textDecoration: 'none' }}
            itemProp="url"
            as={GatsbyLink}
            key={`related-race-${index}`}
          >
            <Card key={`related-race-${index}`}>
              <div
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  sx={{
                    flexGrow: 1,
                    flexBasis: 'sidebar',
                  }}
                >
                  {headerImage && (
                    <MyImage
                      layout="constrained"
                      image={headerImage}
                      objectFit="cover"
                      alt={`${i.title} Photo`}
                      as={GatsbyImage}
                      variant="relatedImage"
                    />
                  )}
                </div>
                <Box
                  sx={{
                    flexGrow: 99999,
                    flexBasis: 0,
                    minWidth: 320,
                    background: 'backgroundAccent',
                  }}
                >
                  <Box sx={{ height: '100%' }}>
                    <Flex
                      sx={{
                        flexDirection: 'column',
                        height: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          flex: '1',
                          marginTop: '20px',
                          marginLeft: '20px',
                          textAlign: 'left',
                        }}
                      >
                        <Text as="h3" variant="postCardTitle">
                          {i.title}
                        </Text>
                      </Box>
                      <Box
                        sx={{
                          flex: '1',
                          marginLeft: '20px',
                          textAlign: 'left',
                        }}
                      >
                        <Text variant="postCardSubtitle">
                          {i.date} - {i.location}
                        </Text>
                      </Box>

                      <Box
                        sx={{
                          flex: '1',
                          marginLeft: '20px',
                          marginY: '10px',
                          textAlign: 'left',
                        }}
                      >
                        <Text as="p" variant="raceStatHeading">
                          Normalized Power
                        </Text>
                        <Text as="p" variant="resultsItem">
                          {i.normalizedPower.toFixed(0)} watts
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </div>
            </Card>
          </Link>
        )
      })}
    </>
  )
}

export default RelatedRaces
