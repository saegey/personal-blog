import { Box, Text } from 'theme-ui'
import { useUnits } from '../../context/UnitProvider'

const UnitSelector = () => {
  const { unitOfMeasure, toggleUnit } = useUnits()
  const isImperial = unitOfMeasure === 'imperial'
  const isMetric = unitOfMeasure === 'metric'

  const handleSelectImperial = () => {
    if (!isImperial) toggleUnit()
  }
  const handleSelectMetric = () => {
    if (!isMetric) toggleUnit()
  }
  return (
    <Box
      sx={{
        fontFamily: 'body',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
      role="radiogroup"
      aria-label="Units"
    >
      <Text sx={{ fontWeight: 600, fontSize: '18px' }}>Units:</Text>
      <Box as="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
        <Box
          as="button"
          role="radio"
          aria-checked={isImperial}
          aria-label="Imperial units"
          onClick={handleSelectImperial}
          sx={{
            bg: 'transparent',
            border: 'none',
            p: 0,
            m: 0,
            cursor: isImperial ? 'default' : 'pointer',
            color: isImperial ? 'text' : 'mutedText',
            fontWeight: isImperial ? 700 : 400,
            textDecoration: isImperial ? 'underline' : 'none',
            textUnderlineOffset: '3px',
            '&:hover': {
              color: isImperial ? 'text' : 'primary',
              textDecoration: isImperial ? 'underline' : 'underline',
            },
          }}
        >
          Imperial
        </Box>
        <Text as="span" sx={{ color: 'mutedText' }}>|</Text>
        <Box
          as="button"
          role="radio"
          aria-checked={isMetric}
          aria-label="Metric units"
          onClick={handleSelectMetric}
          sx={{
            bg: 'transparent',
            border: 'none',
            p: 0,
            m: 0,
            cursor: isMetric ? 'default' : 'pointer',
            color: isMetric ? 'text' : 'mutedText',
            fontWeight: isMetric ? 700 : 400,
            textDecoration: isMetric ? 'underline' : 'none',
            textUnderlineOffset: '3px',
            '&:hover': {
              color: isMetric ? 'text' : 'primary',
              textDecoration: isMetric ? 'underline' : 'underline',
            },
          }}
        >
          Metric
        </Box>
      </Box>
    </Box>
  )
}

export default UnitSelector
