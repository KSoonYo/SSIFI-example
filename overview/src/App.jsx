import { Navbar } from './components'
import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import Install from './pages/Docs/Install'

import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Intro from './pages/Docs/Intro'
import NLP from './pages/Docs/NLP'
import TTS from './pages/Docs/TTS'
import STT from './pages/Docs/STT'
import References from './pages/Docs/References'
import { Footer } from './containers'
import License from './pages/Docs/License'

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`

const Pages = styled.div`
  padding: 64px 16px;
  margin: 0px 238px;
  width: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

const App = () => {
  return (
    <div className="App">
      <div className="gradient_bg">
        <Navbar />
      </div>
      <Center>
        <Sidebar />
        <Pages>
          <Routes>
            <Route path="/ms" element={<Navigate to="/ms/intro" />} />
            <Route path="/ms/intro" element={<Intro />} />
            <Route path="/ms/install" element={<Install />} />
            <Route path="/ms/nlp" element={<NLP />} />
            <Route path="/ms/stt" element={<STT />} />
            <Route path="/ms/tts" element={<TTS />} />
            <Route path="ms/references" element={<References />} />
            <Route path="ms/license" element={<License />} />
          </Routes>
          <Footer />
        </Pages>
      </Center>
    </div>
  )
}

export default App
