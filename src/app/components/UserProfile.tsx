import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  // สร้าง state สำหรับเก็บข้อมูลผู้ใช้, สถานะการโหลด, และข้อความผิดพลาด
  const [userProfile, setUserProfile] = useState<{ name: string; age: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ฟังก์ชันสำหรับโหลดข้อมูลโปรไฟล์ผู้ใช้จาก API
  const fetchUserProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('/user-profile');    // เรียกใช้งาน API
      setUserProfile(response.data);                        // ตั้งค่า state ด้วยข้อมูลที่ได้
    } catch (error) {
      setError('Failed to load user profile');              // ตั้งค่าข้อความผิดพลาด หากมีปัญหาในการโหลด
    } finally {
      setLoading(false);                                    // ตั้งค่าสถานะการโหลดเป็น false ไม่ว่าจะสำเร็จหรือไม่
    }
  };

  return (
    <div>
      <button onClick={fetchUserProfile}>Load User Profile</button> {/* ปุ่มเรียกใช้ฟังก์ชันโหลดข้อมูล */}
      {loading && <div>Loading...</div>} {/* แสดงข้อความกำลังโหลดหากอยู่ในสถานะการโหลด */}
      {error && <div>{error}</div>} {/* แสดงข้อความผิดพลาดหากมีการตั้งค่า */}
      {userProfile && ( // แสดงข้อมูลโปรไฟล์หากมีข้อมูลใน state
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Age: {userProfile.age}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;