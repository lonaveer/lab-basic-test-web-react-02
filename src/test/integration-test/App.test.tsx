import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

describe('Integration Tests for the App', () => {
  beforeEach(() => {
    // ล้าง sessionStorage ก่อนแต่ละการทดสอบ
    sessionStorage.clear();

    // กําหนด Path Url เริ่มต้น คือ /login
    window.history.pushState({}, 'Login Page', '/login');
  });

  // ทดสอบการ login สำเร็จ ควร redirect ไปหน้า products และ sessionStorage isLoggedIn เป็น true
  test('Login success redirects to product page and sets sessionStorage', async () => {
    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // เลือก Input ที่มี Placeholder 'Username' , จากนั้นทำการกรอกค่า 'user' ลงไปในช่อง Input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });

    // เลือก Input ที่มี Placeholder 'Password' , จากนั้นทำการกรอกค่า 'password' ลงไปในช่อง Input
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    // คลิกปุ่มที่มีชื่อว่า 'Login'
    fireEvent.click(screen.getByText('Login'));

    // ตรวจสอบผลลัพธ์หลัง login success => sessionStorage.isLoggedIn เป็น true
    expect(sessionStorage.getItem('isLoggedIn')).toBe('true');

    // ตรวจสอบผลลัพธ์หลัง login success => redirect ไปยังหน้า products (ตรวจสอบจากการค้นหา Text 'Product Page' , ถ้าเจอแสดงว่าอยู่หน้า products)
    expect(screen.getByText('Product Page')).toBeInTheDocument();
  });

  // ทดสอบกรณี login ไม่สำเร็จ ควรแสดง alert 'Invalid credentials'
  test('Login fail shows Invalid credentials alert', async () => {
    // ทำการ spyOn 'window.alert'
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();

    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // เลือก Input ที่มี Placeholder 'Username' , จากนั้นทำการกรอกค่า 'user' ลงไปในช่อง Input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'wrong' } });

    // เลือก Input ที่มี Placeholder 'Password' , จากนั้นทำการกรอกค่า 'password' ลงไปในช่อง Input
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'credentials' } });

    // คลิกปุ่มที่มีชื่อว่า 'Login'
    fireEvent.click(screen.getByText('Login'));

    // ตรวจสอบผลลัพธ์หลัง login fail => alert แสดง Invalid credentials
    expect(alertMock).toHaveBeenCalledWith('Invalid credentials');
  });

  // ทดสอบว่าหลังจาก login สำเร็จแล้ว refresh หน้าจะต้องยังคงอยู่ที่หน้า products
  test('Stays on product page on refresh after login success', async () => {
    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // เลือก Input ที่มี Placeholder 'Username' , จากนั้นทำการกรอกค่า 'user' ลงไปในช่อง Input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'user' } });

    // เลือก Input ที่มี Placeholder 'Password' , จากนั้นทำการกรอกค่า 'password' ลงไปในช่อง Input
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });

    // คลิกปุ่มที่มีชื่อว่า 'Login'
    fireEvent.click(screen.getByText('Login'));

    // ตรวจสอบผลลัพธ์หลัง login success => sessionStorage.isLoggedIn เป็น true
    expect(sessionStorage.getItem('isLoggedIn')).toBe('true');

    // ตรวจสอบผลลัพธ์หลัง login success => redirect ไปยังหน้า products (ตรวจสอบจากการค้นหา Text 'Product Page' , ถ้าเจอแสดงว่าอยู่หน้า products)
    expect(screen.getByText('Product Page')).toBeInTheDocument();

    // คลิกปุ่มที่มีชื่อว่า 'Refresh Page' เพื่อทำการ Refresh หน้าจอ
    fireEvent.click(screen.getByText('Refresh Page'));

    // ตรวจสอบผลลัพธ์หลัง login success => refresh หน้าจอ => sessionStorage.isLoggedIn เป็น true
    expect(sessionStorage.getItem('isLoggedIn')).toBe('true');

    // ตรวจสอบผลลัพธ์หลัง login success => refresh หน้าจอ => redirect ไปยังหน้า products (ตรวจสอบจากการค้นหา Text 'Product Page' , ถ้าเจอแสดงว่าอยู่หน้า products)
    expect(screen.getByText('Product Page')).toBeInTheDocument();
  });

  // ทดสอบกรณี logout จะต้อง redirect ไปหน้า login
  test('Logout redirects to login page', async () => {
    // จำลองการ login สำเร็จ (แบบวิธีลัด) , ด้วยการกำหนด sessionStorage 'isLoggedIn' เป็นค่า true
    sessionStorage.setItem('isLoggedIn', 'true');

    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // คลิกปุ่มที่มีชื่อว่า 'Logout'
    fireEvent.click(screen.getByText('Logout'));

    // ตรวจสอบผลลัพธ์หลัง logout => sessionStorage.isLoggedIn ว่าเป็น null
    expect(sessionStorage.getItem('isLoggedIn')).toBeNull();

    // ตรวจสอบผลลัพธ์หลัง logout => redirect ไปยังหน้า login (ตรวจสอบจากการค้นหา Text 'Login Page' , ถ้าเจอแสดงว่าอยู่หน้า login)
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  // ทดสอบฟังก์ชันการค้นหา ควรแสดงผลิตภัณฑ์ที่ตรงกับคำค้นหา
  test('Search filters products correctly', async () => {
    // จำลองการ login สำเร็จ (แบบวิธีลัด) , ด้วยการกำหนด sessionStorage 'isLoggedIn' เป็นค่า true
    sessionStorage.setItem('isLoggedIn', 'true');

    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // เลือก Input ที่มี Placeholder 'Search products...' , จากนั้นทำการกรอกค่า 'Laptop' ลงไปในช่อง Input
    fireEvent.change(screen.getByPlaceholderText('Search products...'), { target: { value: 'Laptop' } });

    // ตรวจสอบผลลัพธ์หลัง search => จะต้องเจอข้อมูล 'Laptop - Electronics'
    expect(screen.getByText('Laptop - Electronics')).toBeInTheDocument();

    // ตรวจสอบผลลัพธ์หลัง search => จะต้องไม่เจอข้อมูล 'Shirt - Apparel'
    expect(screen.queryByText('Shirt - Apparel')).not.toBeInTheDocument();
  });

  // ทดสอบฟังก์ชันการ 'filter' ควรแสดงผลิตภัณฑ์ที่ตรงกับ 'filter' ที่เลือก
  test('Filter shows correct products', async () => {
    // จำลองการ login สำเร็จ (แบบวิธีลัด) , ด้วยการกำหนด sessionStorage 'isLoggedIn' เป็นค่า true
    sessionStorage.setItem('isLoggedIn', 'true');

    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // คลิกปุ่มที่มีชื่อว่า 'Electronics' เพื่อ filter ข้อมูล
    fireEvent.click(screen.getByText('Electronics'));

    // ตรวจสอบผลลัพธ์หลัง filter => จะต้องเจอข้อมูล 'Laptop - Electronics'
    expect(screen.getByText('Laptop - Electronics')).toBeInTheDocument();

    // ตรวจสอบผลลัพธ์หลัง filter => จะต้องไม่เจอข้อมูล 'Shirt - Apparel'
    expect(screen.queryByText('Shirt - Apparel')).not.toBeInTheDocument();
  });

  // ทดสอบการนำทางไปยังหน้า login สำหรับ route ที่ไม่ได้กำหนด (ไม่มีอยู่จริง) หากยังไม่ได้ login
  test('Navigates to login page for undefined route when not logged in', async () => {
    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // จำลองการไปยัง route ที่ไม่ได้กำหนด (ไม่มีอยู่จริง)
    window.history.pushState({}, 'Unknown Page', '/unknown');

    // ตรวจสอบผลลัพธ์หลัง redirect ไปยังหน้า login
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  // ทดสอบการ redirect ไปหน้า login เมื่อพยายามเข้าถึงหน้า products โดยตรงโดยไม่มีการ login
  test('Redirects to login page when trying to access product page directly without login', async () => {
    // ทำการ render หน้า App ขึ้นมา
    render(<App />);

    // จำลองการนำทางไปยัง '/products' โดยตรงโดยไม่ได้ login
    window.history.pushState({}, 'Product Page', '/products');

    // ตรวจสอบผลลัพธ์หลัง redirect ไปหน้า login , เมื่อพยายามเข้าถึงหน้า products โดยตรงโดยไม่มีการ login
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});