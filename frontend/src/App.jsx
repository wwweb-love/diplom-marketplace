// package
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from "react-router-dom"
// css
import './App.css'
// pages
import { Basket, Products, Product, Login, Registration, Admin, NotFound, ErrorPage } from './pages'
// components
import { Header } from './components'
// actions
import { actionUser } from './actions'

function App() {
  const dispatch = useDispatch()

  // ручка /me при запуске приложения пробуем авторизоваться
  useEffect(() => {
    fetch("http://localhost:3000/auth/me", { credentials: 'include' })
      .then(loaded => loaded.json())
      .then(loaded => {
        const { error, data } = loaded
        if (error) {
          dispatch(actionUser(""))
        }
        dispatch(actionUser(data))
      })
  }, [])

  return (
    <>
      <div className='app'>
        <Header />
        <Routes>
          {/* pages */}
          <Route path='/' element={<Products />} /> 
          <Route path='/product/:id' element={<Product />} />
          <Route path='/basket/user/:id' element={<Basket />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/errors' element={<ErrorPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App
