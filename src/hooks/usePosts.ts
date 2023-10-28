import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const getPosts = (userId: number | undefined) =>
  axios
    .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
      params: { userId },
    })
    .then((res) => res.data);

const usePosts = (userId: number | undefined) =>
  useQuery<Post[], Error>({
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: () => getPosts(userId),
    staleTime: 1 * 60 * 1000, // 1min
  });

export default usePosts;
