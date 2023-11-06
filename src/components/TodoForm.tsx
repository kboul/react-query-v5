import { useRef } from "react";

import { useAddTodo } from "../hooks";

export default function TodoForm() {
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = "";
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
        <button>Add</button>
      </form>
    </>
  );
}
