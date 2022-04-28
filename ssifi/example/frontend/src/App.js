import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Intro from './pages/Intro'
import Recordtest from './components/Recordtest'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/main" element={<Main />} />
      <Route path="/test" element={<Recordtest />} />
    </Routes>
  )
}

export default App
