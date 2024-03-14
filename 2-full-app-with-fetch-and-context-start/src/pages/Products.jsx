
/* 
1. fetch all of the pokemon
2. iterate through the pokemon list
3. for each pokemon object: { id: 1, name: 'pikachu', ... }
4. render <Link to=`/pokemons/${pokemon.id}`>{pokemon.name}</Link>
*/
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