// Guardar To-Do en LocalStorage
export const addTodoToLocalStorage = (todo) => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    // Asegurarse de que cada To-Do tenga un id único
    const todoToStore = { 
        ...todo, 
        id: todo.id || Date.now().toString(),
        synced: false,
        deleted: false 
    };
    todos.push(todoToStore);
    localStorage.setItem('todos', JSON.stringify(todos));
    return todoToStore;
};

// Obtener todos los To-Dos de LocalStorage
export const getTodosFromLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos.filter(todo => !todo.synced);
};

// Eliminar To-Do de LocalStorage
export const deleteTodoFromLocalStorage = (todoId) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.id !== todoId);
    localStorage.setItem('todos', JSON.stringify(todos));
};

// Actualizar To-Do en LocalStorage
export const updateTodoInLocalStorage = (todoId, updatedTodo) => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.map(todo => todo.id === todoId ? { ...todo, ...updatedTodo } : todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};
