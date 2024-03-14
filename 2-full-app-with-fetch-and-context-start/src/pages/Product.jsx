import { useParams, Navigate, Link } from "react-router-dom";
import ProductsContext from "../context/ProductsContext";
import { useContext } from "react";

const Product = () => {
  const contextValues = useContext(ProductsContext);

  // look at the URL bar and grab the value of any path parameters
  const params = useParams();

  // <Route path='/products/:id' element={<Product />} />
  // if the URL is /products/3 --> params.id is "3"
  // if the URL is /products/2 --> params.id is "2"

  console.log(params);

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