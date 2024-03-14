import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductsContextProvider from './context/ProductsContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
  </BrowserRouter >
)
