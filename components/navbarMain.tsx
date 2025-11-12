"use client";
import Link from "next/link";
import { useListCategory } from "./_api/mutation";
import { useEffect } from "react";
export default function NavbarMain() {
  const ListCategory = useListCategory();
  useEffect(() => ListCategory.mutate(), [ListCategory.mutate]);

  if (ListCategory.isPending) return <>Pending...</>;
  if (ListCategory.isError) return <>Error...</>;
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4 w-full justify-center">
        {ListCategory.isSuccess &&
          ListCategory.data.map((category, index) => (
            <Link
              key={category.id}
              href={`/course/${category.name}`}
              className={`${
                index !== 0 ? "border-l border-gray-300 pl-4" : ""
              } text-gray-700 hover:text-gray-900 hover:underline`}
            >
              {category.name}
            </Link>
          ))}
      </div>
    </div>
  );
}
