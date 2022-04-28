import React from 'react'
import '../style/SoundWave.css'

const SoundWave = ({ type }) => {
  return (
    <div className="loader">
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
      <span className={type} />
    </div>
  )
}

export default SoundWave
