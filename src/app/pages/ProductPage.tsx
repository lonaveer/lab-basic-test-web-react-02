import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: number;
  name: string;
  category: string;
};

// สมมุติว่ามี array ของสินค้าเหล่านี้อยู่
const initialProducts: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Shirt', category: 'Apparel' },
  { id: 3, name: 'Watch', category: 'Accessories' },
];

// สมมุติว่าเรามีหมวดหมู่ต่อไปนี้
const categories = ['All', 'Electronics', 'Apparel', 'Accessories'];

const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (category: string) => {
    setFilter(category);
  };

  const filteredProducts = products.filter((product) => {
    return (filter === 'All' || product.category === filter) &&
           product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleRefresh = () => {
    navigate('/'); // Refresh หน้าจอ
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn'); // ลบข้อมูลการ login
    navigate('/login'); // Redirect ไปยังหน้า login
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    /* istanbul ignore next */
    if (!isLoggedIn) {
      navigate('/login'); // Redirect ไปยังหน้า login
    }
  }, [navigate]);

  return (
    <div>
        <h2>Product Page</h2>
        <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
        />
        <div>
            {categories.map((category) => (
            <button key={category} onClick={() => handleFilterChange(category)}>
                {category}
            </button>
            ))}
        </div>
        <ul>
            {filteredProducts.map((product) => (
            <li key={product.id}>
                {product.name} - {product.category}
            </li>
            ))}
        </ul>

        <hr/>
        <div>
          <button onClick={handleRefresh}>Refresh Page</button>
        </div>
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default ProductPage;