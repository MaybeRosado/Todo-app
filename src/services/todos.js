import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { addTodoToLocalStorage, deleteTodoFromLocalStorage } from './localstorage'

// Añadir To-Do
export const addTodo = async (userId, newTodo) => {
    try {
        const todoData = {
            text: newTodo,
            complete: false,
            userId: userId,
            synced: navigator.onLine,
            id: Date.now().toString()
        };

        if (!navigator.onLine) {
            await addTodoToLocalStorage(todoData);
            console.log('To-Do saved locally');
            return todoData;
        }

        const docRef = await addDoc(collection(db, 'todos'), {
            text: newTodo,
            complete: false,
            userId: userId
        });

        const todoWithId = { ...todoData, id: docRef.id, synced: true };
        await addTodoToLocalStorage(todoWithId);
        return todoWithId;
    } catch (error) {
        console.log('Error adding a new To-Do:', error.message);
        throw error;
    }
};

// Obtener todos los To-Do
export const getTodos = async (userId) => {
    try {
        const q = query(collection(db, 'todos'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() });
        });
        return todos;
    } catch (error) {
        console.log('Error getting the To-Dos:', error.message);
        throw error;
    }
};

// Marcar To-Do como completado
export const completeTodo = async (todoId) => {
    try {
        const todoRef = doc(db, 'todos', todoId);
        await updateDoc(todoRef, { complete: true });
    } catch (error) {
        console.log('Error completing the To-Do:', error.message);
    }
};

// Eliminar To-Do
export const deleteTodo = async (todoId) => {
    try {
        console.log('Deleting todo with ID:', todoId);

        // Verificar si está online
        if (navigator.onLine) {
            if (todoId.length > 10) {  // ID de Firebase
                const todoRef = doc(db, 'todos', todoId);
                await deleteDoc(todoRef);
                console.log('Deleted from Firebase');
            }
        } else {
            console.log('Offline, skipping Firebase deletion');
        }

        // Eliminar de LocalStorage
        await deleteTodoFromLocalStorage(todoId);
        console.log('Deleted from LocalStorage');
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};
