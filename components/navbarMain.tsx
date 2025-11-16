"use client";
import Link from "next/link";
import { useListCategory } from "./_api/mutation";
import { useEffect } from "react";
export default function NavbarMain() {
  const ListCategory = useListCategory();
  useEffect(() => ListCategory.mutate(), [ListCategory.mutate]);

  if (ListCategory.isPending)
    return (
      <div className="flex w-full shadow-md justify-center animate-pulse">
        <div className="max-w-full h-12 overflow-x-auto scrollbar-hide">
          <div className="py-4 flex w-full text-[16px]">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`bg-gray-200 w-40 h-6 ${
                  i === 0 ? "" : "border-l border-gray-300 pl-4"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  if (ListCategory.isError) return <>Error...</>;
  if (ListCategory.isSuccess) {
    console.log(ListCategory.data);
    return (
      <div className="flex w-full shadow-md justify-center">
        <div className="max-w-full h-12 overflow-x-auto scrollbar-hide">
          <div className="py-4 flex w-full text-[16px]">
            {ListCategory.data?.map((category, index) => (
              <Link
                key={category.id}
                href={`/courses/${category.name}`}
                className={`${
                  index !== 0 ? "border-l border-gray-300" : ""
                } px-4 text-gray-700 hover:text-gray-900 hover:underline whitespace-nowrap`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
