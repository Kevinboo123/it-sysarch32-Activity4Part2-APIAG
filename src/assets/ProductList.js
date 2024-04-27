import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3002/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [token]);

  // Function to update product list when a new product is created
  const addProductToList = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            {/* Add headers for other actions if needed */}
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <img src={`http://localhost:3002/${product.productImage}`} alt={product.name} style={{ width: '100px' }} />
              </td>
              {/* Add action buttons here if needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;