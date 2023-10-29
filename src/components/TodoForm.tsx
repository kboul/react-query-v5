import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

import { Todo } from "../types";

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const addTodo = useMutation({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo) => {
      console.log(savedTodo);
      // Approach 1: invaldiating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // Approach 2: Updating the data in the cache
      queryClient.setQueryData(["todos"], (todos: Todo[]) => [
        savedTodo,
        ...(todos ?? []),
      ]);
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
    <form onSubmit={handleSubmit}>
      <input ref={ref} type="text" />
      <button>Add</button>
    </form>
  );
}
