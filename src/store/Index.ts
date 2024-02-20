import { createStore } from "redux";
import { reduserTodoList } from "./ResultReduser";

const store = createStore(reduserTodoList);
export default store;
