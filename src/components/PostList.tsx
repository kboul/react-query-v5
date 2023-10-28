import { usePosts } from "../hooks";

export default function PostList() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return "Loading...";
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {posts?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
