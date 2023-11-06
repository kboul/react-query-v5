import { useQuery } from "@tanstack/react-query";

import { Todo } from "../types";
import { queryKeys } from "../constants";
import ApiClient from "../api/client";

const apiClient = new ApiClient<Todo>("/todos");

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: queryKeys.todos,
    queryFn: apiClient.getAll,
    staleTime: 10 * 1000, // 10s
  });

export default useTodos;
