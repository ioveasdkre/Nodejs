import { v4 as uuidv4 } from "uuid";
import { Todo } from "./todoModel";

const todoList: Todo[] = [
  {
    id: uuidv4(),
    title: "今天要刷牙",
  },
  {
    id: uuidv4(),
    title: "今天要吃早餐",
  },
];

//#region setTodo [ 設定 todo ]
/**
 * 設定 todo
 * @param title
 * @returns boolean
 */
const setTodo = (title: string): boolean => {
  try {
    todoList.push({
      id: uuidv4(),
      title: title,
    });

    return true;
  } catch (e) {
    return false;
  }
};
//#endregion

//#region deleteTodo [ 刪除 todo ]
/**
 * 刪除 todo
 * @param title
 * @returns boolean
 */
const deleteTodo = (id: string): boolean => {
  try {
    const index = todoList.findIndex((element) => element.id === id);

    if (index === -1) return false;

    todoList.splice(index, 1);

    return true;

  } catch (e) {
    return false;
  }
};
//#endregion

//#region deleteTodo [ 刪除 todo ]
/**
 * 刪除 todo
 * @param title
 * @returns boolean
 */
const patchTodo = (id: string, title: string): boolean => {
  try {
    const index = todoList.findIndex((element) => element.id === id);

    if (index === -1) return false;

    todoList[index].title = title;

    return true;

  } catch (e) {
    return false;
  }
};
//#endregion

export { todoList, setTodo, deleteTodo, patchTodo };
