import { Link as GatsbyLink } from 'gatsby'
import { Text, Box, Card, Link, Flex, LinkProps as ThemeUILinkProps } from 'theme-ui'
type GatsbyLinkProps = ThemeUILinkProps & { to: string };
import { IGatsbyImageData, getImage } from 'gatsby-plugin-image'

import CustomImage from '../../CustomImage'

type Props = {
  items: [
    {
      slug: string
      title: string
      date: string
      normalizedPower: number
      headerImage: IGatsbyImageData | null
      timeInRed: string
      location: string
    }
  ]
}

const RelatedRaces = ({ items }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: '690px',
        margin: 'auto',
        marginY: '40px',
      }}
    >
      <Box
        sx={{
          marginBottom: ['10px', '16px', '16px'],
        }}
      >
        <Text as="h2" variant="resultsHeading">
          Related Races
        </Text>
      </Box>
      {items.map((i, index) => {
        const linkProps: GatsbyLinkProps = {
          to: `/${i.slug}`,
          rel: 'related',
          sx: { textDecoration: 'none' },
          itemProp: 'url',
          as: GatsbyLink,
        };
        return (
          <Link key={`related-race-${index}`} {...linkProps}>
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
                    flexBasis: 'sidebar',
                  }}
                >
                  <CustomImage
                    layout="constrained"
                    image={getImage(i.headerImage)}
                    objectFit="cover"
                    alt={`${i.title} Photo`}
                    variant="relatedImage"
                  />
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
    </Box>
  )
}

export default RelatedRaces
