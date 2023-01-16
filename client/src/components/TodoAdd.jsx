import { useState } from "react";
import styles from "./TodoAdd.module.css";

export const TodoAdd = ({onNewTodo}) => {
    const [message, setMessage] = useState('');
    const [InputValue, setInputValue] = useState({
        id: new Date().getTime(),
        step: ""
        
      });
    const onInputChange = ({ target }) => {
      setInputValue({
        id: new Date().getTime(),
        step: target.value
      })
      setMessage(target.value)
    }

    const addNewTodo = (event) =>{
    event.preventDefault();
    if(InputValue.step.length <= 1) return;
    onNewTodo(InputValue);
    setInputValue({
        id: new Date().getTime(),
        description: ""
      });
      setMessage('')
      
  }
    
  return (
    <form className={styles.formAddTodo}>
          <input
          onChange={onInputChange}
            type="text"
            placeholder="a new Step"
            className={styles.formInputField}
            value={message}
          />
          <button onClick={addNewTodo} type="submit" className="btn btn-outline-primary mt-1">
            Add
          </button>
        </form>
  )
}
