import { useState } from "react";
import { usePosts } from "../hooks";

export default function PostList() {
  const [userId, setUserId] = useState<number>();
  const { data: posts, isLoading, error } = usePosts(userId);

  if (isLoading) return "Loading...";
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        onChange={(e) => setUserId(parseInt(e.target.value))}
        value={userId}
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>

      <ul>
        {posts?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  );
}
