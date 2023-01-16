import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, getTodos, removeTodo } from "../store/actions/actions";


export const useTodo = () => {

  const todos = useSelector((state) => state.initialToDo);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTodos())
  }, [])
  
  const handleNewTodo = (todo) => {
    dispatch(addTodo(todo));
  };

  const handleDeleteTodo = (id) => {
    // console.log(id);
    dispatch(removeTodo(id))
  };
  //dispatchTodoAction mas de un reduce

  

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
  };
};
