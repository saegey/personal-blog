import { IKVideo, IKContext } from 'imagekitio-react'
import { Box } from 'theme-ui'

const VideoPlayer = ({
  fileName,
  borderRadius = '4px',
}: {
  fileName: string
  borderRadius: string
}) => {
  return (
    <Box sx={{ width: '100%', video: { borderRadius } }}>
      <IKContext
        publicKey="public_0yo2SuC0X+YKHkXDmLUU4S18vcA="
        urlEndpoint="https://ik.imagekit.io/hcbw4dyr5"
        transformationPosition="path"
      >
        <IKVideo path={`/${fileName}`} width="100%" controls={true} />
      </IKContext>
    </Box>
  )
}

export default VideoPlayer
