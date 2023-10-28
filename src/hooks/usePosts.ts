import axios from "axios";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface PostQuery {
  page: number;
  pageSize: number;
}

const getPosts = (query: PostQuery) =>
  axios
    .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
      params: {
        _start: (query.page - 1) * query.pageSize,
        _limit: query.pageSize,
      },
    })
    .then((res) => res.data);

const usePosts = (query: PostQuery) =>
  useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () => getPosts(query),
    staleTime: 1 * 60 * 1000, // 1min
    placeholderData: keepPreviousData,
  });

export default usePosts;
