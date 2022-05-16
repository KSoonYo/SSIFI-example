import React from 'react'
import '../style/Moon.css'

const Moon = ({ ssifiTalk = false }) => {
  return (
    <div className="center">
      <div className={ssifiTalk ? 'moon-active' : 'moon'}></div>
    </div>
  )
}

export default Moon
