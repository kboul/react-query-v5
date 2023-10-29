import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "../types";
import { queryKeys } from "../constants";

interface AddTodoContext {
  previousTodos: Todo[];
}

export default function useAddTodo(onAdd: () => void) {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: (newTodo: Todo) => {
      const previousTodos =
        queryClient.getQueryData<Todo[]>(queryKeys.todos) ?? [];

      queryClient.setQueryData(queryKeys.todos, (todos: Todo[]) => [
        newTodo,
        ...(todos ?? []),
      ]);

      onAdd();

      return { previousTodos };
    },
    // savedTodo: derived from the server
    // newTodo: derived from the client on onMutate
    onSuccess: (savedTodo, newTodo) => {
      // Approach 1: invaldiating the cache
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.todos,
      // });

      // Approach 2: Updating the data in the cache
      queryClient.setQueryData(queryKeys.todos, (todos: Todo[]) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData(queryKeys.todos, context.previousTodos);
    },
  });
}
