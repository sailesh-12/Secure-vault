import { useState } from 'react'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import HomePage from './pages/HomePage.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import CreateVault from './components/CreateVault.jsx'
import UpdateVault from './components/UpdateVault.jsx'
function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verifyOtp' element={<VerifyOtp/>}/>
        <Route path='/createVault' element={<CreateVault/>}/>
        <Route path='/updateVault' element={<UpdateVault/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
