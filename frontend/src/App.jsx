import './App.css'
// import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Main from './pages/Main'
import Intro from './pages/Intro'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
// import { getRequest } from '../api/requests.js'

function App() {
  const particlesInit = async main => {
    await loadFull(main)
  }

  const particlesLoaded = container => {}

  const location = useLocation()

  // key 발급 요청
  // useEffect(() => {
  //   if (!localStorage.getItem('key')) {
  //     try {
  //       const response = getRequest('api/channel/key/')
  //       localStorage.setItem('key', response.data.key)
  //     } catch {
  //       console.log('key publish failed')
  //     }
  //   }
  // }, [])

  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            fpsLimit: 60,
            fullScreen: false,
            interactivity: {
              detectsOn: 'canvas',
              events: {
                resize: true,
              },
            },

            particles: {
              color: {
                value: '#ffffff',
              },

              collisions: {
                enable: true,
              },

              number: {
                density: {
                  enable: true,
                  area: 1080,
                },
                limit: 0,
                value: 400,
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.05,
                  speed: 1,
                  sync: false,
                },
                random: {
                  enable: true,
                  minimumValue: 0.05,
                },
                value: 1,
              },
              shape: {
                type: 'circle',
              },
              size: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 2.5,
              },
            },
            detectRetina: true,
          }}
        />
        <TransitionGroup className="transition-group">
          <CSSTransition key={location.pathname} classNames="fade" timeout={700}>
            <Routes location={location}>
              <Route path="/" element={<Intro />} />
              <Route path="/main" element={<Main />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  )
}

export default App
