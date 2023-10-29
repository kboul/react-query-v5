import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

import { Todo } from "../types";

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onSuccess: (savedTodo) => {
      // Approach 1: invaldiating the cache
      // queryClient.invalidateQueries({
      //   queryKey: ["todos"],
      // });

      // Approach 2: Updating the data in the cache
      queryClient.setQueryData(["todos"], (todos: Todo[]) => [
        savedTodo,
        ...(todos ?? []),
      ]);

      ref.current!.value = "";
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
