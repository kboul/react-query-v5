import { Fragment } from "react";
import { usePosts } from "../hooks";

const pageSize = 10;

export default function PostList() {
  const { data, isLoading, error, fetchNextPage, isFetchingNextPage } =
    usePosts({ pageSize });

  if (isLoading) return "Loading...";
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul>
        {data?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </Fragment>
        ))}
      </ul>

      <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? "Loading..." : "Load more"}
      </button>
    </>
  );
}
