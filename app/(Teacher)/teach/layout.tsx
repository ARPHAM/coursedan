import TeacherHeader from "./header";

export default function TeachLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
