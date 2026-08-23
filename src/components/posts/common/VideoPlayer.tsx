import { IKVideo, IKContext } from 'imagekitio-react'

const VideoPlayer = ({
  fileName,
  borderRadius: _borderRadius = '0px',
}: {
  fileName: string
  borderRadius: string
}) => {
  return (
    <div className="my-12 w-full overflow-hidden border-y border-line">
      <IKContext
        publicKey="public_0yo2SuC0X+YKHkXDmLUU4S18vcA="
        urlEndpoint="https://ik.imagekit.io/hcbw4dyr5"
        transformationPosition="path"
      >
        <IKVideo path={`/${fileName}`} width="100%" controls={true} />
      </IKContext>
    </div>
  )
}

export default VideoPlayer
