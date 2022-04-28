import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Intro from './pages/Intro'

function App() {
  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
