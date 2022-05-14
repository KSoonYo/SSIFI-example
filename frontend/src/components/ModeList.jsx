import React, { useState } from 'react'
import Flicking from '@egjs/react-flicking'
import { Box, Button } from '../../node_modules/@mui/material/index'

import '../style/ModeList.css'

const ModeList = ({ changeAiMode }) => {
  const [btnIdx, setBtnIdx] = useState(1)

  const modeList = [
    { name: '소설', mode: 'novel' },
    { name: '심리상담', mode: 'wellness' },
    { name: '화가', mode: 'painter' },
    { name: '뷰티기사', mode: 'beauty' },
    { name: '경제기사', mode: 'economy' },
    { name: '연예기사', mode: 'entertainments' },
    { name: 'IT기사', mode: 'IT' },
    { name: '사회기사', mode: 'society' },
    { name: '작가', mode: 'writer' },
    { name: '코미디', mode: 'comedy' },
    { name: '드라마', mode: 'drama' },
    { name: '뉴스', mode: 'news' },
  ]

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
