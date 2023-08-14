import React from 'react'

import { useViewport } from './ViewportProvider'

export const ViewProvider = () => {
  const { width } = useViewport()

  return (
    <div style={{ padding: '20px', width: '600px', height: '300px' }}>
      {width}
    </div>
  )
}
