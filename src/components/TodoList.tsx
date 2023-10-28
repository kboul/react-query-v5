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
    .then((res) => res.data)
    .catch((error) => console.log(error));

export default function TodoList() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
