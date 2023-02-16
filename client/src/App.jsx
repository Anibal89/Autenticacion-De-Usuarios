import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Nopage from './components/Nopage'

function App() {  
  return (
   <>
    <BrowserRouter>
    {/*Rutas de Accesso*/}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='*' element={<Nopage/>}/>
    </Routes>
    </BrowserRouter>
   </>
  )
}

export default App


