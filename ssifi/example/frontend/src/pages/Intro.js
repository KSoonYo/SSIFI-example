import React from 'react'
import { useNavigate } from 'react-router-dom'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style/Intro.css'

const Intro = () => {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%' }}>
      <div style={{ height: '40vh' }}>
        <img src="assets/ssifi2.gif" alt="씨피" width="100%" height="100%" style={{ objectFit: 'cover' }} />
      </div>
      <h1>
        <p>안녕하세요</p>
        <p>저는 SSIFI입니다.</p>
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button
          type="button"
          className="intro-button"
          style={{ border: '1px solid #3b8c9a', borderRadius: '25px' }}
          onClick={() => {
            navigate('/main')
          }}
        >
          <FontAwesomeIcon icon={faAngleRight} size="3x" style={{ color: 'gray' }} />
        </button>
      </div>
    </div>
  )
}

export default Intro
