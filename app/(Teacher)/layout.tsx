// app/(Teacher)/layout.tsx
import {Suspense} from 'react';
export default function TeacherGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
