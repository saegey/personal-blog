import { Label, Radio, Box, Text, Flex } from 'theme-ui'

type ThemeContextProps = {
  unitOfMeasure: {
    unitOfMeasure: string
    toggleUnit: () => void
  }
}

const UnitSelector = ({ unitOfMeasure }: ThemeContextProps) => {
  return (
    <Box
      sx={{
        // flex: '0 1 40px',
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '30px',
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
        Unit
      </Text>
      <Label sx={{ marginBottom: '5px' }}>
        <Radio
          name="unitOfMeasure"
          value="imperial"
          checked={unitOfMeasure.unitOfMeasure === 'imperial'}
          onChange={unitOfMeasure.toggleUnit}
        />
        <Text sx={{ marginY: 'auto' }}>Imperial</Text>
      </Label>
      <Label sx={{ marginBottom: '5px' }}>
        <Radio
          name="unitOfMeasure"
          value="metric"
          onChange={unitOfMeasure.toggleUnit}
          checked={unitOfMeasure.unitOfMeasure === 'metric'}
        />
        <Text sx={{ marginY: 'auto' }}>Metric</Text>
      </Label>
    </Box>
  )
}

export default UnitSelector
