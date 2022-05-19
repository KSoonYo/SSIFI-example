import React, { useState } from 'react'
import Flicking from '@egjs/react-flicking'
import { Box, Button } from '../../node_modules/@mui/material/index'

import '../style/ModeList.css'

const ModeList = ({ changeAiMode, modeList }) => {
  const [btnIdx, setBtnIdx] = useState(1)

  return (
    <Box className="mode-list">
      <Flicking align="prev" circular={true}>
        {modeList.map((list, index) => (
          <Button
            className={index === btnIdx ? 'mode-btn-selected' : 'mode-btn'}
            key={index}
            onClick={() => {
              setBtnIdx(index)
              changeAiMode(list.mode)
            }}
            sx={{
              color: 'white',
              borderRadius: '10px',
              border: '1px solid white',
              mr: '10px',
              fontFamily: 'SpoqaHanSansNeo Regular',
            }}
          >
            {list.name}
          </Button>
        ))}
      </Flicking>
    </Box>
  )
}
export default ModeList
