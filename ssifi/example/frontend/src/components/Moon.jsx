import React from 'react'
import '../style/Moon.css'

const Moon = () => {
  return (
    <div className="center">
      <div className="moon"></div>
    </div>
  )
}

export default Moon

// style
// const center = {
//   position: 'relative',
//   minWidth: '200px',
//   maxwidth: '200px',
//   minHeight: '200px',
//   maxHeight: '200px',
//   margin: '0 auto',
//   borderRadius: '50%',
//   background: 'transparent',
// }

// const moon = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '150px',
//   height: '150px',
//   borderRadius: '50%',
//   background: '#F6F3FF',
//   boxShadow:
//     '0 0 15px rgba(230, 190, 255, 0.5), 0 0 30px rgba(230, 190, 255, 0.5), 0 0 45px rgba(230, 190, 255, 0.5), 0 0 60px rgba(230, 190, 255, 0.5), 0 0 10px rgba(230, 190, 255, 0.5), 0 -25px 8px -22px rgba(246, 243, 255, 0.5) inset, -10px -20px 25px 0px rgba(173, 83, 137,.3) inset, 0px -50px 40px 0px rgba(173, 83, 137, .4) inset',
// }
