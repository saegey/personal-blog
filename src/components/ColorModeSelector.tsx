import { Button, Flex, Box, useColorMode, Radio, Label, Text } from 'theme-ui'

import { BoxSvgType } from '../common/types'

const SvgBox = Box as any as (props: BoxSvgType) => JSX.Element

const ColorModeSelector = ({}) => {
  const [colorMode, setColorMode] = useColorMode()

  const toggleUnit = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }

  return (
    <Box
      sx={{
        flex: '0 1 40px',
        marginTop: '20px',
        // marginBottom: '20px',
        marginLeft: '45px',
        fontFamily: 'body',
      }}
    >
      <Text
        sx={{
          fontWeight: 600,
          fontSize: '18px',
          marginBottom: '10px',
          display: 'block',
        }}
      >
        Theme
      </Text>

      <Label sx={{ marginBottom: '5px' }}>
        <Radio
          name="colorMode"
          title="Dark Mode"
          value="dark"
          checked={colorMode === 'dark'}
          onChange={toggleUnit}
        />
        <Flex sx={{ flexDirection: 'row', gap: '10px' }}>
          <Text sx={{ marginY: 'auto' }}>Dark </Text>
          <Flex sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <SvgBox as="svg" viewBox="0 0 512 512" height="18" width="18">
              <g className="logo-solid">
                <path d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></path>
              </g>
            </SvgBox>
          </Flex>
        </Flex>
      </Label>
      <Label sx={{ marginBottom: '5px' }}>
        <Radio
          name="colorMode"
          value="light"
          title="Light Mode"
          checked={colorMode === 'light'}
          onChange={toggleUnit}
        />
        <Flex sx={{ flexDirection: 'row', gap: '10px' }}>
          <Text sx={{ marginY: 'auto' }}>Light </Text>
          <Flex sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <SvgBox as="svg" viewBox="0 0 24 24" height="18" width="18">
              <g className="logo-solid">
                <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"></path>
              </g>
            </SvgBox>
          </Flex>
        </Flex>
      </Label>
    </Box>
  )
}

export default ColorModeSelector
