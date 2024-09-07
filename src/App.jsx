import { Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './components/common/Header'
import Home from './components/Home/Home'

function App() {

  return (
    <>
      <Header />
      <main className='site-main'>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </>
  )
}

export default App
