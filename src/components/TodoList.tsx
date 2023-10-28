import { useTodos } from "../hooks";

export default function TodoList() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) return "Loading...";
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
