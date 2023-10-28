import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const getTodos = () =>
  axios
    .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data);

export default function TodoList() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

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
