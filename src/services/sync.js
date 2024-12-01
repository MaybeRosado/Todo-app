import { deleteTodoFromLocalStorage, updateTodoInLocalStorage, getTodosFromLocalStorage } from './localstorage'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const syncTodos = async () => {
    try {
        const localTodos = await getTodosFromLocalStorage();

        for (const todo of localTodos) {
            if (!todo.synced) {
                // Subir el To-Do a Firebase
                const docRef = await addDoc(collection(db, 'todos'), {
                    text: todo.text,
                    complete: todo.complete,
                    userId: todo.userId
                });

                console.log('To-Do synced with Firebase');

                // Actualizar el estado de "synced" en LocalStorage
                await updateTodoInLocalStorage(todo.id, { id: docRef.id, synced: true });

                // Eliminar el To-Do local después de la sincronización
                await deleteTodoFromLocalStorage(todo.id);
            }
        }

    } catch (error) {
        console.log('Error synchronizing the To-Dos:', error.message);
    }
};

window.addEventListener('online', () => {
    console.log('Connection restored. Synchronizing data...');
    syncTodos();
});

export default syncTodos;
