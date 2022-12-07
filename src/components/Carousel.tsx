import { Carousel } from 'react-responsive-carousel'
import { Image, Box } from 'theme-ui'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { useState } from 'react'

const CustomCarousel = ({ images }: { children: JSX.Element }) => {
  const [maximizedImage, maximizeImage] = useState(null)
  const maxi =
    maximizedImage !== null ? (
      <Box variant="styles.faded">
        <div
          sx={{
            marginX: 'auto',
            marginY: 'auto',
          }}
        >
          <Carousel
            showArrows={true}
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            onClickItem={e => {
              maximizeImage(null)
            }}
            selectedItem={maximizedImage}
          >
            {images.map((image, i) => (
              <Box
                key={`carousel-${i}`}
                sx={{ width: '100%', position: 'relative' }}
              >
                <Image
                  image={getImage(image)}
                  alt={'blah'}
                  as={GatsbyImage}
                  sx={{
                    width: ['100%', '100%', '100%'],
                    borderRadius: [4, 4, 4],
                    '-webkit-mask-image':
                      '-webkit-radial-gradient(white, black)',
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </div>
      </Box>
    ) : (
      <></>
    )
  return (
    <div>
      {maxi}
      <Carousel
        showArrows={true}
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        onClickItem={e => {
          maximizeImage(e)
        }}
      >
        {images.map((image, i) => (
          <Box
            key={`carousel-${i}`}
            sx={{ width: '100%', position: 'relative' }}
          >
            <Image
              image={getImage(image)}
              alt={'blah'}
              as={GatsbyImage}
              sx={{
                width: ['100%', '100%', '100%'],
                borderRadius: [4, 4, 4],
                '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
              }}
            />
          </Box>
        ))}
      </Carousel>
    </div>
  )
}

export default CustomCarousel
