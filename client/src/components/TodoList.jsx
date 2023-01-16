import styles from "./TodoList.module.css";
export const TodoList = ({todos, onDeleteTodo }) => {
  return (
    <ul className={styles.listGroup}>
    { todos.map(({step,id}) => 
    <li key={id} className={styles.listInner}>
      <span className = {styles.listInnerText} >{step}</span>
    <button 
    className="btn btn-danger"
    onClick={()=>onDeleteTodo(id)}
    >Borrar</button>
    </li>
)}
  </ul>
  )
}
