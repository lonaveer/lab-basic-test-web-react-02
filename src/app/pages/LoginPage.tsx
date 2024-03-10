import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // สมมุติการตรวจสอบ credentials
    if (username === 'user' && password === 'password') {
      sessionStorage.setItem('isLoggedIn', 'true'); // การตั้งค่า sessionStorage เพื่อจำลองการ login
      navigate('/products'); // ไปที่หน้า Product
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/products'); // Redirect ไปยังหน้า products
    }
  }, [navigate]);

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;