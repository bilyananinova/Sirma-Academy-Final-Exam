import { Routes, Route } from 'react-router-dom'
import './App.css'

import Header from './components/common/Header'
import Home from './components/Home/Home'
import MatchDetails from './components/MatchDetails/MatchDetails'
import PlayerDetails from './components/PlayerDetails/PlayerDetails'
import TeamDetails from './components/TeamDetails/TeamsDetails'

function App() {

  return (
    <>
      <Header />
      <main className='site-main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/match-details/:matchId' element={<MatchDetails />} />
          <Route path='/:teamName/player/:playerId' element={<PlayerDetails />} />
          <Route path='/team/:teamId' element={<TeamDetails />} />
        </Routes>
      </main>
    </>
  )
}

export default App
