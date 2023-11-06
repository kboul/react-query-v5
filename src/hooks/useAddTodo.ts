import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Todo } from "../types";
import { queryKeys } from "../constants";
import { todoApi } from "../api";

interface AddTodoContext {
  previousTodos: Todo[];
}

export default function useAddTodo(onAdd: () => void) {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) => todoApi.post(todo),
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
