
import './App.css'
import Footer from './Components/page/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import HomePage from './Components/HomePage/HomePage'
import Navbar from './Components/page/Navbar'
import Content from './Components/Contents/Content'
import UserReg from './Components/UserReg/UserReg'
import BlogCreation from './Components/BlogCreation/BlogCreation'
import BlogList from './Components/blogList/blogList'
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<UserReg />} />
          <Route path='/content' element={<Content />} />
          <Route path='blogList' element={<BlogList />} />
          <Route path='/blogCreate' element={<BlogCreation />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
