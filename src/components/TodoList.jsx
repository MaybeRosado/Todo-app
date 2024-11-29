import TodoCard from "./TodoCard";

const TodoList = (props) => {
    const {todos, selectedTab, handleDeleteTodo, handleCompleteTodo} = props;
    console.log(todos)
    const filterTodosList = 
    selectedTab === 'All' 
    ? todos 
    : selectedTab === 'Completed' 
    ? todos.filter(val => val.complete) 
    : todos.filter(val => !val.complete);
  return (
    <>
        {filterTodosList.map((todo, index)=> {
            const todoId = todo.id || index
            console.log(todoId);
            return (
                <TodoCard 
                    key={todoId} 
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleCompleteTodo={handleCompleteTodo}
                />
            )
        })}
    </>
  )
}

export default TodoList