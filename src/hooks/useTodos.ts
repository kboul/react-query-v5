import { useQuery } from "@tanstack/react-query";

import { Todo } from "../types";
import { queryKeys } from "../constants";
import { todoApi } from "../api";

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: queryKeys.todos,
    queryFn: todoApi.getAll,
    staleTime: 10 * 1000, // 10s
  });

export default useTodos;
