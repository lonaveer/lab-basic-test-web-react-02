import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import ProductPage from './app/pages/ProductPage';
import LoginPage from './app/pages/LoginPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;