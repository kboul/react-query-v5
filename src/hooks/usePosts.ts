import axios from "axios";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: ((pageParam as number) - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, // 1min
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // 1-> 2
      return lastPage.length > 0 ? pages.length + 1 : undefined;
    },
  });

export default usePosts;
