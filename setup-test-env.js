import { createSerializer } from '@emotion/jest'
import * as emotion from '@emotion/react'
global.IS_REACT_ACT_ENVIRONMENT = true
expect.addSnapshotSerializer(createSerializer(emotion))
