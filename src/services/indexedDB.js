const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('todoAppDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('todos')) {
                db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

// Add To-Do to IndexedDB
export const addTodoToDB = async (todo) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('todos', 'readwrite');
        const store = transaction.objectStore('todos');
        const request = store.add(todo);

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
    });
};

// Get all To-Dos from IndexedDB
export const getTodosFromDB = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('todos', 'readonly');
        const store = transaction.objectStore('todos');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error);
    });
};

// Delete To-Do from IndexedDB
export const deleteTodoFromDB = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('todos', 'readwrite');
        const store = transaction.objectStore('todos');
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = (event) => reject(event.target.error);
    });
};

// Update To-Do in IndexedDB
export const updateTodoInDB = async (updatedTodos) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('todos', 'readwrite');
        const store = transaction.objectStore('todos');
        
        updatedTodos.forEach((todo) => {
            const request = store.put(todo); // Actualizar la To-Do
            request.onerror = (event) => reject(event.target.error);
        });

        transaction.oncomplete = () => resolve(true);
    });
};
