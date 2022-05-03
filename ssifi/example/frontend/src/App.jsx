import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Intro from './pages/Intro'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

function App() {
  const particlesInit = async main => {
    console.log(main)

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main)
  }

  const particlesLoaded = container => {
    console.log(container)
  }

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
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
