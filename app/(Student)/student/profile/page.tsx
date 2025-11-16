import Tab from "./components/tab";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-6">
      <div className="w-full max-w-6xl bg-white shadow-sm border border-gray-200 rounded-md flex overflow-hidden">
        <Tab />
      </div>
    </div>
  );
}
