import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import UserProfile from '../../../app/components/UserProfile';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserProfile', () => {
  // 1. ไม่โหลดข้อมูลโปรไฟล์ก่อนคลิกปุ่ม
  test('ไม่แสดงข้อมูลโปรไฟล์ก่อนการคลิกปุ่ม', () => {
    // ทำการ render component 'UserProfile'
    render(<UserProfile />);

    // ====================================================================================
    // (กรณีต้องการตรวจสอบ Text ในหน้าจอที่เป็นค่า default , สามารถใช้ queryByText แทน findByText
    // เพราะความรวดเร็ว เนื่องจาก findByText จะมีดีเลย์ 1 วินาที เพื่อรอผลลัพธ์จาก UI
    // ส่วน queryByText จะไม่มีดีเลย์ ซึ่งเหมาะกับการเช็คค่า default ที่มีใน UI แต่แรกแล้ว)
    // ====================================================================================

    // ตรวจสอบผลลัพธ์ : จะต้องไม่พบ text 'Name:' ภายในหน้าจอ
    expect(screen.queryByText('Name:')).not.toBeInTheDocument();

    // ตรวจสอบผลลัพธ์ : จะต้องไม่พบ text 'Age:' ภายในหน้าจอ
    expect(screen.queryByText('Age:')).not.toBeInTheDocument();
  });

  // 2. โหลดและแสดงข้อมูลโปรไฟล์ผู้ใช้
  test('โหลดและแสดงข้อมูลโปรไฟล์ผู้ใช้หลังจากคลิกปุ่ม', async () => {
    // ทำการจำลองค่า return ของ axios ใหม่
    mockedAxios.get.mockResolvedValueOnce({ data: { name: 'Jane Doe', age: 32 } });

    // ทำการ render component 'UserProfile'
    render(<UserProfile />);

    // คลิกปุ่ม 'Load User Profile'
    fireEvent.click(screen.getByText('Load User Profile'));

    // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Name: Jane Doe' ภายในหน้าจอ
    expect(await screen.findByText('Name: Jane Doe')).toBeInTheDocument();

    // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Age: 32' ภายในหน้าจอ
    expect(await screen.findByText('Age: 32')).toBeInTheDocument();
  });

  // 3. จัดการกับ error หาก API ล้มเหลว
  test('แสดงข้อความ error เมื่อ API ล้มเหลว', async () => {
    // ทำการจำลองค่า return error ของ axios ใหม่
    mockedAxios.get.mockRejectedValueOnce(new Error('Failed to load user profile'));

    // ทำการ render component 'UserProfile'
    render(<UserProfile />);

    // คลิกปุ่ม 'Load User Profile'
    fireEvent.click(screen.getByText('Load User Profile'));

    // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Failed to load user profile' ภายในหน้าจอ
    expect(await screen.findByText('Failed to load user profile')).toBeInTheDocument();
  });

  // 4. อัพเดทข้อมูลโปรไฟล์เมื่อ API response เปลี่ยนแปลง
  test('อัพเดทข้อมูลโปรไฟล์หลังจาก API response เปลี่ยนแปลง', async () => {
    // ทำการจำลองค่า return ของ axios (รอบแรก)
    mockedAxios.get.mockResolvedValueOnce({ data: { name: 'Jane Doe', age: 32 } });

    // ทำการ render component 'UserProfile' และดึงค่า rerender มารอก่อน
    const { rerender } = render(<UserProfile />);

    // คลิกปุ่ม 'Load User Profile'
    fireEvent.click(screen.getByText('Load User Profile'));

    // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Name: Jane Doe' ภายในหน้าจอ
    expect(await screen.findByText('Name: Jane Doe')).toBeInTheDocument();

    // ทำการจำลองค่า return ของ axios (อีกรอบ)
    mockedAxios.get.mockResolvedValueOnce({ data: { name: 'John Doe', age: 34 } });

    // rerender component เพื่อจำลองการเปลี่ยนแปลงใน response
    rerender(<UserProfile />);

    // คลิกปุ่ม 'Load User Profile'
    fireEvent.click(screen.getByText('Load User Profile'));

    // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Name: John Doe' ภายในหน้าจอ
    expect(await screen.findByText('Name: John Doe')).toBeInTheDocument();

    // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Age: 34' ภายในหน้าจอ
    expect(await screen.findByText('Age: 34')).toBeInTheDocument();
  });

  // 5. API ถูกเรียกเพียงครั้งเดียวเมื่อคลิกปุ่ม
  test('API ถูกเรียกเพียงครั้งเดียวเมื่อคลิกปุ่ม', async () => {
    // ทำการ render component 'UserProfile'
    render(<UserProfile />);

    // คลิกปุ่ม 'Load User Profile'
    fireEvent.click(screen.getByText('Load User Profile'));

    // หากมีการเรียกใช้ 'fireEvent' แล้วพบว่า expect ไม่มี await
    // ต้องใช้ act ครอบ expect อีกที , เพื่อให้ expect นั้นรอค่าผลลัพธ์หลังจาก UI นั้นแสดงผลเสร็จสิ้น
    await act(async () => {
      // ตรวจสอบว่าการเรียกใช้งาน mockedAxios.get ถูกทำเพียงครั้งเดียวหลังจากคลิก
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    })
  });
});