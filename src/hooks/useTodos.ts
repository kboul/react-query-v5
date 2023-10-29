import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { Todo } from "../types";

const getTodos = () =>
  axios
    .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
    .then((res) => res.data);

const useTodos = () =>
  useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: 10 * 1000, // 10s
  });

export default useTodos;
