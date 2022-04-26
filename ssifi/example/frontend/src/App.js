import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Intro from './pages/Intro'
import RecordTest from './components/RecordTest'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/main" element={<Main />} />
      <Route path="/wave" element={<RecordTest />} />
    </Routes>
  )
}

export default App
