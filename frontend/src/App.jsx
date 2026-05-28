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
import { getUserMe } from './api'

function App() {
  const dispatch = useDispatch()

  // ручка /me при запуске приложения пробуем авторизоваться
  useEffect(() => {
    getUserMe()
      .then(loaded => {
        console.log(loaded)
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
        <div className="pages">
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
      </div>
    </>
  )
}

export default App
