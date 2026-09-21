import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar'
import Home from './Home'
import Songs from './Songs'
import Callback from './Callback'
import SongPlayer from './SongPlayer'
import { useState } from 'react'

function App() {


  return (
    <>
      <div className="container">
        <Navbar />
        <Routes className='routes'>
          <Route path="/" element={<Home />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/song/:id" element={<SongPlayer />} />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </div>
    </>
  )
}

export default App
