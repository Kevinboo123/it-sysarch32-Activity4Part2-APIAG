import React, { useState } from 'react';
import Login from './components/Login';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './index.css'; 

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  return (
    <div className="container">
      <h1>Midterm Project App</h1>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <ProductForm token={token} />
          <ProductList token={token} />
        </>
      )}
    </div>
  );
};

export default App;
