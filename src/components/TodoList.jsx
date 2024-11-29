import TodoCard from './TodoCard'

const TodoList = (props) => {
    const {todos, selectedTab, handleDeleteTodo, handleCompleteTodo} = props;
    console.log('All todos in TodoList:', todos);
    
    const filterTodosList = 
    selectedTab === 'All' 
    ? todos 
    : selectedTab === 'Completed' 
    ? todos.filter(val => val.complete) 
    : todos.filter(val => !val.complete);

    return (
        <>
            {filterTodosList.map((todo, index)=> {
                const todoId = todo.id || todo.text || index;
                console.log(`Todo ID for ${todo.text}:`, todoId);
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

export default TodoList;