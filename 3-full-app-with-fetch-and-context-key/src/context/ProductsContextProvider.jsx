import { useEffect, useState } from "react";
import ProductsContext from "./ProductsContext"
import fetchData from '../utils/fetchData';

/* 
Create and manage state, and share it throughout the app
*/
const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null);

  useEffect(() => {
    const doFetch = async () => {
      const [data, error] = await fetchData('https://dummyjson.com/products')
      if (data) setProducts(data.products);
      if (error) setError(error);
    }
    doFetch();
  }, [])

  const contextValues = { products, error }

  return (
    <ProductsContext.Provider value={contextValues}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsContextProvider