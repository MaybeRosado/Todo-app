import TodoCard from "./TodoCard";

const TodoList = (props) => {
    const {todos} = props;
    

    const tab = 'All'

    const filterTodosList = tab === 'All' ? 
        todos :
            tab === 'Completed' ? 
        todos.filter(val => val.complete) : 
            todos.filter(val => !val.complete)
  return (
    <>
        {filterTodosList.map((todo, todoIndex)=> {
            return (
                <TodoCard 
                    key={todoIndex} 
                    todo={todo}
                />
            )
        })}
    </>
  )
}

export default TodoList