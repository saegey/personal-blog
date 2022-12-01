import { Text } from 'theme-ui'

const Caption = ({ text }: { children: JSX.Element }) => {
  return (
    <Text as="em" variant="caption">
      {text}
    </Text>
  )
}

export default Caption
