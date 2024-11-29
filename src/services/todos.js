import { collection, addDoc, deleteDoc, doc} from "firebase/firestore";
import { db } from "../firebase";
import { addTodoToDB, deleteTodoFromDB } from './indexedDB'

// Add To-Do
export const addTodo = async (userId, newTodo) => {
    try {
        const todoData = {
            text: newTodo,
            complete: false,
            userId: userId,
            synced: navigator.onLine
        };

        if (!navigator.onLine) {
            // Si estamos offline, guardamos la To-Do en IndexedDB
            await addTodoToDB(todoData);
            console.log('To-Do saved locally');
            return todoData;
        }

        // Si estamos online, guardamos la To-Do en Firebase
        const docRef = await addDoc(collection(db, 'todos'), {
            text: newTodo,
            complete: false,
            userId: userId
        });

        // Sincronizamos con IndexedDB
        const todoWithId = { ...todoData, id: docRef.id, synced: true };
        await addTodoToDB(todoWithId);
        
        return todoWithId;
    } catch (error) {
        console.log('Error at adding a new To-Do:', error.message);
        throw error;
    }
};

// Delete To-Do
export const deleteTodo = async (todoId) => {
    try {
        if (navigator.onLine) {
            // Si estamos online, eliminamos de Firebase
            const todoRef = doc(db, 'todos', todoId);
            await deleteDoc(todoRef);

            // También eliminamos de IndexedDB
            await deleteTodoFromDB(todoId);
        } else {
            // Si estamos offline, eliminamos solo de IndexedDB
            await deleteTodoFromDB(todoId);
        }
    } catch (error) {
        console.log('Error at deleting the To-Do:', error.message);
        throw error;
    }
};

