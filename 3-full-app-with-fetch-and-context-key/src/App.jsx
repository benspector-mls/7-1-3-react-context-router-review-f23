import './App.css'

import {
  Routes,
  Route,
} from "react-router-dom";

import Nav from './components/NavBar'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Fallback from './pages/Fallback'
import Products from './pages/Products'
import Product from './pages/Product'

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:id' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </>
  )
}

export default App
