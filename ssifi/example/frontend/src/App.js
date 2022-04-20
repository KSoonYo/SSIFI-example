import './App.css'
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Intro from './pages/Intro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/main" element={<Main />} />
    </Routes>
=======
import Intro from './pages/Intro.js'

function App() {
  return (
    <div>
      <Intro />
    </div>
>>>>>>> upstream/frontend
  )
}

export default App
