import { Suspense } from "react";
import Search from "./search";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">My Application</h1>
      <Suspense fallback={<div>Loading search...</div>}>
        <Search />
      </Suspense>
      <div className="space-x-4 flex">
        <div className="inline-block px-4 py-2 hover:bg-gray-700">Link 1</div>
        <div className="inline-block px-4 py-2 hover:bg-gray-700">Link 2</div>
        <div className="inline-block px-4 py-2 hover:bg-gray-700">Link 3</div>
        <div className="rounded-full px-4 py-2 hover:bg-gray-700 bg-red-200 w-10 h-10"></div>
      </div>
    </header>
  );
}
