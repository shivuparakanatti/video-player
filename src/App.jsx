import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import UploadForm from './pages/UploadForm'
import VideoPlayer from './pages/VideoPlayer'

function App() {
 

  return (
    <>
    <div className='mx-4 md:mx-32 lg:mx-44 my-2 md:my-10 lg:my-12'>

     
    </div>

    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/uploadvideo' Component={UploadForm}/>
      <Route path='/videos/:title' Component={VideoPlayer}/>
    </Routes>
    </>
  )
}

export default App
