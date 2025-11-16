import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import axios from "@/config/axios";

type ListCategory = {
  id: number;
  name: string;
}[];

export const useListCategory = () => {
  return useQuery<ListCategory>({
    queryKey: ["ListCategory"],
    queryFn: async () => {
      const res = await axios.get("/api/public/courses-category");
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

// export const useListCategory = (params: UseGroupsParams) => {
// 	return useQuery<PaginateData<Group>>({
// 		queryKey: ['useGroups', params],
// 		queryFn: async ({ signal }) => {
// 			let test = await axios.get('/admin/group/list', { params, signal }).then((res) => res.data.data)
// 			return test
// 		},
// 		placeholderData: keepPreviousData,
// 	})
// }
