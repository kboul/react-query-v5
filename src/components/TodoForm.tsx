import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

import { Todo } from "../types";

interface AddTodoContext {
  previousTodos: Todo[];
}

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todosx", todo)
        .then((res) => res.data),
    onMutate: (newTodo: Todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) ?? [];

      queryClient.setQueryData(["todos"], (todos: Todo[]) => [
        newTodo,
        ...(todos ?? []),
      ]);

      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },
    // savedTodo: derived from the server
    // newTodo: derived from the client on onMutate
    onSuccess: (savedTodo, newTodo) => {
      // Approach 1: invaldiating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // Approach 2: Updating the data in the cache
      queryClient.setQueryData(["todos"], (todos: Todo[]) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      if (!context) return;

      queryClient.setQueryData(["todos"], context.previousTodos);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ref.current?.value)
      addTodo.mutate({
        id: 0,
        title: ref.current.value,
        completed: false,
        userId: 1,
      });
  };

  return (
    <>
      {addTodo.error && (
        <div style={{ border: "1px solid red", width: "fit-content" }}>
          {addTodo.error.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input ref={ref} type="text" />
        <button>{addTodo.isPending ? "Adding..." : "Add"}</button>
      </form>
    </>
  );
}
