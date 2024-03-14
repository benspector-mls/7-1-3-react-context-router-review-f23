# React Router + Context

**Table of Contents**:
- [Context:](#context)
  - [Examples](#examples)
- [React Router:](#react-router)
  - [Examples](#examples-1)


## Context:

* `Context` is the "glue" that connects the "Provider" with the "Consumer"
* `Context.Provider` manages state and determines the context values
  * `useState` to create shared state values
  * If you want to fetch: `useEffect` to fetch on render and set the state
* `useContext` gets ("consumes") the Context values in child components

### Examples

The `ProductsContextProvider` creates the `products` state, renders the `ProductsContext.Provider` to provide the `products` state through the `contextValues` object, and fetches data from the API to update that state.

```jsx
import { useEffect, useState } from "react";
import ProductsContext from "./ProductsContext"
import fetchData from '../utils/fetchData';

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
```

The `Products` component uses the context value `products` to render a `<Link>` for each product.

```jsx
import { Link } from "react-router-dom";
import ProductsContext from "../context/ProductsContext";
import { useContext } from "react";

const Products = () => {

  const contextValues = useContext(ProductsContext);

  return (
    <>
      <h1>Products</h1>
      <ul>
        {
          contextValues.products.map((product) => {
            return (
              <li>
                <Link to={`/products/${product.id}`}>
                  {product.title}
                </Link>
              </li>
            )
          })
        }
      </ul >
    </>
  )
}

export default Products;
```

## React Router:

* Links provide navigation ("take me to `/about`") 
* Routes/Route respond to changes in navigation ("I'm at `/about`, show me the `<About />` component")
* Path parameters allow URLs to communicate a specific resource being displayed:
  * `/products/:id` lets the user navigate to a URL like `/products/4` to communicate that they want the product with the `id` of 4
* `useParams()` returns an object with the path parameters present in the current URL

### Examples

A `main.jsx` file that uses both a BrowserRouter and context:
```jsx
import { BrowserRouter } from 'react-router-dom'
import ProductsContextProvider from './context/ProductsContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <ProductsContextProvider>
      <App />
    </ProductsContextProvider>
  </BrowserRouter >
)
```

An `App.jsx` file that defines routes. The `NavBar` component is rendered regardless of the current browser location (the current URL).

```jsx
function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<Product />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}
```

This component is rendered for the path `'/products/:id'` where `id` is the path parameter. The component uses `useParams` to get the `params.id` value. It also pulls `products` data from the context and uses the `params.id` value to find the matching product and render its data (or a fallback message).

```jsx
import { useParams, Navigate, Link } from "react-router-dom";
import ProductsContext from "../context/ProductsContext";
import { useContext } from "react";

const Product = () => {
  const contextValues = useContext(ProductsContext);
  
  // If the URL is `/products/3` then `params.id` is `"3"`
  const params = useParams();

  const product = contextValues.products.find((product) => product.id === Number(params.id))

  if (!product) return (
    <>
      <p>product not found</p>
      <Link to='/'>Go Home</Link>
    </>
  )

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>Rating: {product.rating}</p>
      <img src={product.images[0]} />
    </>
  )
}

export default Product;
```