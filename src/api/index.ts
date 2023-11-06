import ApiClient from "./client";
import { Todo } from "../types";
import { Post } from "../types";

const todoApi = new ApiClient<Todo>("/todos");
const postApi = new ApiClient<Post>("/posts");

export { todoApi, postApi };
