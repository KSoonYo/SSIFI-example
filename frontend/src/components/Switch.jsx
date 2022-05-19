import React from 'react'
import '../style/Switch.css'
const Switch = ({ mode, setMode }) => {
  return (
    <div className="switch">
      <input type="checkbox" className="checkbox" id="checkbox" onChange={() => setMode(!mode)} />
      <label htmlFor="checkbox" className="label">
        <div className="ball"></div>
      </label>
    </div>
  )
}

export default Switch
