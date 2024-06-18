import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/Register'
import { ProtectRouter } from './components/ProtectRouter'
import { Toaster } from 'react-hot-toast'
import { CategoryPage } from './pages/CategoryPage' 


import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Error404 } from './pages/Error404'


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Navigate to="/register" />
}

function App() {
  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<ProtectRouter> <Home /> </ProtectRouter>} />
          <Route path='*' element={<Error404 />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/category' element={<ProtectRouter><CategoryPage /></ProtectRouter>} />
        </Routes>


      </BrowserRouter>

      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
