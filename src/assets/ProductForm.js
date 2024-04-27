import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ token }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('productImage', image);

    try {
      await axios.post('http://localhost:3002/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      // Reset form fields after successful submission
      setName('');
      setPrice('');
      setImage(null);
      setErrorMessage('');
    } catch (error) {
      console.error('Error creating product:', error);
      setErrorMessage('Error creating product. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(event) => setImage(event.target.files[0])}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default ProductForm;