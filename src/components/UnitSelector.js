/** @jsxImportSource theme-ui */
import * as React from 'react'
import { Label, Radio, Box, Text, Flex } from 'theme-ui'
import PropTypes from 'prop-types'

const UnitSelector = ({ unitOfMeasure }) => {
  return (
    <Flex sx={{ flexDirection: 'column', flexFlow: 'column', flex: 1 }}>
      <Box
        sx={{
          flex: '0 1 40px',
          marginTop: 'auto',
          marginBottom: '20px',
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
          Unit
        </Text>
        <Label sx={{ marginBottom: '5px' }}>
          <Radio
            name='unitOfMeasure'
            value='imperial'
            checked={unitOfMeasure.unitOfMeasure === 'imperial'}
            onClick={unitOfMeasure.toggleUnit}
          />
          <Text sx={{ marginY: 'auto' }}>Imperial</Text>
        </Label>
        <Label sx={{ marginBottom: '5px' }}>
          <Radio
            name='unitOfMeasure'
            value='metric'
            onClick={unitOfMeasure.toggleUnit}
            checked={unitOfMeasure.unitOfMeasure === 'metric'}
          />
          <Text sx={{ marginY: 'auto' }}>Metric</Text>
        </Label>
      </Box>
    </Flex>
  )
}
UnitSelector.propTypes = {
  unitOfMeasure: PropTypes.shape({
    unitOfMeasure: PropTypes.string,
    toggleUnit: PropTypes.func,
  }),
}

export default UnitSelector
