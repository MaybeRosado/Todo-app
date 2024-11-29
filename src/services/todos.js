import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { addTodoToDB, deleteTodoFromDB } from './indexedDB'

// Add To-Do
export const addTodo = async (userId, newTodo) => {
    try {
        const todoData = {
            text: newTodo,
            complete: false,
            userId: userId,
            synced: navigator.onLine,
            id: Date.now().toString() // Add a unique ID
        };

        if (!navigator.onLine) {
            await addTodoToDB(todoData);
            console.log('To-Do saved locally');
            return todoData;
        }

        const docRef = await addDoc(collection(db, 'todos'), {
            text: newTodo,
            complete: false,
            userId: userId
        });

        const todoWithId = { ...todoData, id: docRef.id, synced: true };
        await addTodoToDB(todoWithId);
        
        return todoWithId;
    } catch (error) {
        console.log('Error at adding a new To-Do:', error.message);
        throw error;
    }
};


export const getTodos = async (userId) => {
    try{
        const q = query(collection(db, 'todos'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const todos = [];
        querySnapshot.forEach((doc) => {
            todos.push({id: doc.id, ...doc.data() });
        });
        return todos;
    }catch (error) {
        console.log('Error at getting the To-Dos:', error.message);
        throw error;
    }
};

//Mark completed the To-Do's
export const completeTodo = async (todoId) => {
    try{
        const todoRef = doc(db, 'todos', todoId);
        await updateDoc(todoRef, {complete: true});

    }catch (error) {
        console.log('Error at completing the To-Do:', error.message);

    }
};

// Delete To-Do
export const deleteTodo = async (todoId) => {
    try {
        console.log('Deleting todo with ID:', todoId);

        if (navigator.onLine) {
            // For online todos with Firebase ID
            if (todoId.length > 10) {  // Assuming Firebase IDs are longer
                const todoRef = doc(db, 'todos', todoId);
                await deleteDoc(todoRef);
            }
        }

        // Always try to delete from IndexedDB
        await deleteTodoFromDB(todoId);
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};
