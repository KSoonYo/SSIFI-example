import React from 'react'
import { Box, Button, Typography } from '../../node_modules/@mui/material/index'

import '../style/ModeList.css'

const ModeList = () => {
  const modeList = [
    { name: '소설', mode: 'novel' },
    { name: '상식', mode: 'wellness' },
    { name: '화가', mode: 'painter' },
    { name: '기자', mode: 'reporter' },
    { name: '작가', mode: 'writer' },
  ]

  const onSetMode = mode => {
    sessionStorage.setItem('mode', mode)
  }

  return (
    <Box className="mode-list">
      {modeList.map(list => (
        <Button
          key={list.name}
          onClick={() => {
            onSetMode(list.mode)
          }}
          sx={{
            color: 'white',
            borderRadius: '10px',
            border: '1px solid white',
            fontFamily: 'SpoqaHanSansNeo Regular',
          }}
        >
          <Typography>{list.name}</Typography>
        </Button>
      ))}
    </Box>
  )
}

export default ModeList
