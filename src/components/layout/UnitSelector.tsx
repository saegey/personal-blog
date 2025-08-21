import { Box, Text, ThemeUICSSObject } from 'theme-ui'
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
  const optionBase: ThemeUICSSObject = {
    variant: 'buttons.ghost',
    px: 0,
    py: 0,
    borderRadius: 'none',
    lineHeight: 'inherit',
  }

  const Option = ({
    label,
    active,
    onClick,
    ariaLabel,
  }: {
    label: string
    active: boolean
    onClick: () => void
    ariaLabel: string
  }) => (
    <Box
      as="button"
      role="radio"
      aria-checked={active}
      aria-label={ariaLabel}
      onClick={onClick}
      sx={{
        ...optionBase,
        cursor: active ? 'default' : 'pointer',
        color: active ? 'text' : 'textMuted',
        fontWeight: active ? 700 : 400,
        textDecoration: active ? 'underline' : 'none',
        textUnderlineOffset: 2,
        '&:hover': {
          color: active ? 'text' : 'primary',
          textDecoration: 'underline',
        },
      }}
    >
      {label}
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
      }}
      role="radiogroup"
      aria-label="Units"
    >
      <Text sx={{ fontWeight: 'heading', fontSize: 2 }}>Units:</Text>
      <Box
        as="span"
        sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}
      >
        <Option
          label="Imperial"
          active={isImperial}
          onClick={handleSelectImperial}
          ariaLabel="Imperial units"
        />
        <Text as="span" sx={{ color: 'textMuted' }}>
          |
        </Text>
        <Option
          label="Metric"
          active={isMetric}
          onClick={handleSelectMetric}
          ariaLabel="Metric units"
        />
      </Box>
    </Box>
  )
}

export default UnitSelector
