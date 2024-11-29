
const TodoCard = (props) => {
    const {todo, handleDeleteTodo, handleCompleteTodo} = props;
    
  return (
    <div className="card todo-item">
        <p>{todo.text}</p>
        <div className="todo-buttons">
            <button onClick={() => {
                handleCompleteTodo(todo.id)
            }} disabled={todo.complete} >
                <h6>Done</h6>
            </button>
            <button onClick={()=>{handleDeleteTodo(todo.id)}}>
                <h6>Delete</h6>
            </button>
        </div>
    </div>
  )
}

export default TodoCard