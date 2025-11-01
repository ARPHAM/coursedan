"use client";
import SearchIcon from "./icon/search";
import { useQueryState } from "nuqs";

export default function Search({ className }: { className?: string }) {
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: "",
  });
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-10 h-10 text-gray-500 dark:text-gray-400 my-auto" />
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Mockups, Logos..."
        required
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
