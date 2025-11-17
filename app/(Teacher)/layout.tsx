import { Suspense } from "react";

// app/(Teacher)/layout.tsx
export default function TeacherGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
