import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const getPosts = () =>
  axios
    .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.data);

const usePosts = () =>
  useQuery<Post[], Error>({
    queryKey: ["todos"],
    queryFn: getPosts,
    staleTime: 1 * 60 * 1000, // 1min
  });

export default usePosts;
