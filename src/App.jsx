import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Repositories from './pages/Repositories'
import RepoDetail from './components/RepoDetail'
import Analysis from './pages/Analysis'
import NotFound from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Navigate to='/' />} />
      <Route path='/repositories' element={<Repositories />}/>
      <Route path="/repo/:user/:repoName" element={<RepoDetail />} />
      <Route path='/analysis' element={<Analysis />}/>
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App
