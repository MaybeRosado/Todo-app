import {deleteTodoFromDB} from './indexedDB'
import {getTodosFromDB} from './indexedDB'
import {addDoc, collection} from 'firebase/firestore';
import { db } from '../firebase';

const syncTodos = async () => {
    try{
        const localTodos = await getTodosFromDB();
        for(const todo of localTodos){
            const docRef = await addDoc(collection(db, 'todos'), todo);
            console.log('To-Do sync with Firebase');

            //Delete todo dynx w indexedDB
            await deleteTodoFromDB(todo.id);
        }
    }catch(error){
        console.log('Error synchronizing the To-Dos:', error.message);
    }
};

//Listening the online event
window.addEventListener('online', () => {
    console.log('connection restored. Synchronizing data');
    syncTodos();
})

export default syncTodos;