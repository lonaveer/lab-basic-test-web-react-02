import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import UserProfile from '../../../app/components/UserProfile';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('UserProfile', () => {
  // 1. ไม่โหลดข้อมูลโปรไฟล์ก่อนคลิกปุ่ม
  test('ไม่แสดงข้อมูลโปรไฟล์ก่อนการคลิกปุ่ม', () => {
    // // ทำการ render component 'UserProfile'
    // xxxxx(<UserProfile />);

    // // ====================================================================================
    // // (กรณีต้องการตรวจสอบ Text ในหน้าจอที่เป็นค่า default , สามารถใช้ queryByText แทน findByText
    // // เพราะความรวดเร็ว เนื่องจาก findByText จะมีดีเลย์ 1 วินาที เพื่อรอผลลัพธ์จาก UI
    // // ส่วน queryByText จะไม่มีดีเลย์ ซึ่งเหมาะกับการเช็คค่า default ที่มีใน UI แต่แรกแล้ว)
    // // ====================================================================================

    // // ตรวจสอบผลลัพธ์ : จะต้องไม่พบ text 'Name:' ภายในหน้าจอ
    // expect(screen.queryByText('xxxxx')).xxxxx.xxxxx();

    // // ตรวจสอบผลลัพธ์ : จะต้องไม่พบ text 'Age:' ภายในหน้าจอ
    // expect(xxxxx.queryByText('xxxxx')).xxxxx.xxxxx();
  });

  // 2. โหลดและแสดงข้อมูลโปรไฟล์ผู้ใช้
  test('โหลดและแสดงข้อมูลโปรไฟล์ผู้ใช้หลังจากคลิกปุ่ม', async () => {
    // // ทำการจำลองค่า return ของ axios ใหม่
    // mockedAxios.get.mockResolvedValueOnce({ data: { name: 'Jane Doe', age: 32 } });

    // // ทำการ render component 'UserProfile'
    // xxxxx

    // // คลิกปุ่ม 'Load User Profile'
    // fireEvent.xxxxx(screen.getByText('xxxxx'));

    // // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Name: Jane Doe' ภายในหน้าจอ
    // expect(await screen.findByText('xxxxx')).xxxxx();

    // // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Age: 32' ภายในหน้าจอ
    // expect(await screen.findByText('xxxxx')).xxxxx();
  });

  // 3. จัดการกับ error หาก API ล้มเหลว
  test('แสดงข้อความ error เมื่อ API ล้มเหลว', async () => {
    // // ทำการจำลองค่า return error ของ axios ใหม่
    // mockedAxios.get.mockRejectedValueOnce(new Error('Failed to load user profile'));

    // // ทำการ render component 'UserProfile'
    // xxxxx

    // // คลิกปุ่ม 'Load User Profile'
    // xxxxx

    // // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Failed to load user profile' ภายในหน้าจอ
    // expect(await xxxxx.findByText('xxxxx')).xxxxx();
  });

  // 4. อัพเดทข้อมูลโปรไฟล์เมื่อ API response เปลี่ยนแปลง
  test('อัพเดทข้อมูลโปรไฟล์หลังจาก API response เปลี่ยนแปลง', async () => {
    // // ทำการจำลองค่า return ของ axios (รอบแรก)
    // xxxxx.xxxxx.xxxxx({ data: { name: 'Jane Doe', age: 32 } });

    // // ทำการ render component 'UserProfile' และดึงค่า rerender มารอก่อน
    // const { rerender } = render(<UserProfile />);

    // // คลิกปุ่ม 'Load User Profile'
    // fireEvent.xxxxx(screen.getByText('xxxxx'));

    // // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Name: Jane Doe' ภายในหน้าจอ
    // expect(await xxxxx.findByText('xxxxx')).xxxxx();

    // // ทำการจำลองค่า return ของ axios (อีกรอบ)
    // xxxxxx.xxxxx.xxxxx({ data: { name: 'John Doe', age: 34 } });

    // // rerender component เพื่อจำลองการเปลี่ยนแปลงใน response
    // rerender(<UserProfile />);

    // // คลิกปุ่ม 'Load User Profile'
    // fireEvent.xxxxx(xxxxx.getByText('xxxxx'));

    // // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Name: John Doe' ภายในหน้าจอ
    // expect(await screen.findByText('xxxxx')).xxxxx();

    // // ตรวจสอบผลลัพธ์ : จะต้องพบ text 'Age: 34' ภายในหน้าจอ
    // expect(await xxxxx.findByText('xxxxx')).xxxxx();
  });

  // 5. API ถูกเรียกเพียงครั้งเดียวเมื่อคลิกปุ่ม
  test('API ถูกเรียกเพียงครั้งเดียวเมื่อคลิกปุ่ม', async () => {
    // // ทำการ render component 'UserProfile'
    // xxxxx

    // // คลิกปุ่ม 'Load User Profile'
    // xxxxx

    // // หากมีการเรียกใช้ 'fireEvent' แล้วพบว่า expect ไม่มี await
    // // ต้องใช้ act ครอบ expect อีกที , เพื่อให้ expect นั้นรอค่าผลลัพธ์หลังจาก UI นั้นแสดงผลเสร็จสิ้น
    // await act(async () => {
    //   // ตรวจสอบว่าการเรียกใช้งาน mockedAxios.get ถูกทำเพียงครั้งเดียวหลังจากคลิก
    //   expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    // })
  });
});