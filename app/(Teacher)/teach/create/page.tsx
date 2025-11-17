// File: app/(Teacher)/teach/create/page.tsx

import { Suspense } from 'react';
// ⚠️ CHÚ Ý: Import component đã đổi tên ở Bước 1
import CreateCourseForm from './CreateCourseForm'; 

// Đây là Server Component, không dùng hook client nào
export default function CreateCoursePageWrapper() {
  return (
    // Bắt buộc phải có <Suspense> để bảo vệ các hook client bên trong CreateCourseForm
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Đang tải Form...
      </div>
    }>
      <CreateCourseForm /> 
    </Suspense>
  );
}