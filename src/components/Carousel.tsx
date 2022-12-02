import { Carousel } from 'react-responsive-carousel'
import { Image, Box } from 'theme-ui'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import { useState } from 'react'

const CustomCarousel = ({ images }: { children: JSX.Element }) => {
  const [maximizedImage, maximizeImage] = useState('')
  const maxi = maximizedImage ? (
    <Box variant="styles.faded">
      <div
        sx={{
          marginX: 'auto',
          marginY: 'auto',
        }}
      >
        <Box
          sx={{ p: '0px' }}
          onClick={() => {
            maximizeImage('')
          }}
        >
          <Image
            objectFit="contain"
            image={getImage(maximizedImage)}
            alt={''}
            as={GatsbyImage}
            variant="fullScreen"
          />
        </Box>
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
          maximizeImage(images[e])
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
