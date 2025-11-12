import React, { useRef } from "react";

import { ChevronLeftIcon, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";
import ReactPaginate from "react-paginate";

const FilterByPage = ({
  name,
  pageCount = 0,
}: {
  name: string;
  pageCount: number;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useQueryState(name);

  return (
    <div className="flex gap-5 items-center text-gray-2">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<ChevronRight size={18} />}
        previousLabel={<ChevronLeftIcon size={18} />}
        pageCount={pageCount}
        forcePage={Number(page || 1) - 1}
        onPageChange={({ selected }) => {
          const target = selected + 1;
          if (inputRef.current?.value) {
            inputRef.current.value = String(target);
          }
          setPage(String(target));
        }}
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
        breakLinkClassName="block w-[20px] h-[31px] flex items-center justify-center"
        pageLinkClassName="w-8 h-8 flex items-center justify-center rounded-md text-sm"
        pageClassName="hover:bg-gray-100 rounded-md"
        nextLinkClassName="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
        previousLinkClassName="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
        containerClassName="flex items-center gap-1"
        activeLinkClassName="border shadow"
        disabledClassName="opacity-40 pointer-events-none"
      />
    </div>
  );
};

export default FilterByPage;
