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
      {items.map(i => {
        const headerImage = getImage(i.headerImage)
        return (
          <Card>
            <div
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              <div
                sx={{
                  flexGrow: 1,
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
                      <Link to={`/${i.slug}`} rel="related" as={GatsbyLink}>
                        <Text as="h3" variant="heading3">
                          {i.title}
                        </Text>
                      </Link>
                    </Box>
                    <Box
                      sx={{
                        flex: '1',
                        marginLeft: '20px',
                        textAlign: 'left',
                      }}
                    >
                      <Text variant="relatedSubheader">{i.date} - {i.location}</Text>
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

                    <Box
                      sx={{
                        flex: '1',
                        marginLeft: '20px',
                        textAlign: 'left',
                        marginBottom: '20px',
                      }}
                    >
                      <Text as="p" variant="raceStatHeading">
                        Time in Red
                      </Text>
                      <Text as="p" variant="resultsItem">
                        {i.timeInRed}
                      </Text>
                    </Box>

                    <Box
                      sx={{
                        flex: '1',
                        marginLeft: '20px',
                        textAlign: 'left',
                        marginBottom: '20px',
                      }}
                    >
                      <Text as="p" variant="raceStatHeading">
                        Avg Speed
                      </Text>
                      <Text as="p" variant="resultsItem">
                        {`${(
                          (i.distance /
                            (i.elapsedTime.seconds - i.stoppedTime)) *
                          2236.9362920544
                        ).toFixed(2)} mph`}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </div>
          </Card>
        )
      })}
    </>
  )
}

export default RelatedRaces
