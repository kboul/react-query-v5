import { useState } from "react";
import { usePosts } from "../hooks";

const pageSize = 10;

export default function PostList() {
  const [page, setPage] = useState(1);
  const { data: posts, isLoading, error } = usePosts({ page, pageSize });

  if (isLoading) return "Loading...";
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul>
        {posts?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        disabled={page === 1}
        onClick={() => setPage((prevPage) => prevPage - 1)}
        style={{ marginRight: 10 }}
      >
        Previous
      </button>
      <button
        disabled={page === pageSize}
        onClick={() => setPage((prevPage) => prevPage + 1)}
      >
        Next
      </button>
    </>
  );
}
