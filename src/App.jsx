import Header from './components/Header'
import Tabs from './components/Tabs'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import { useEffect, useState } from 'react'
import { loginUser, registerUser, logoutUser } from './services/auth'
import { addTodo} from './services/todos'
import { getTodos} from './services/todos'
import { completeTodo} from './services/todos'
import { deleteTodo } from './services/todos'
import {useOnlineStatus} from './hooks/useOnlineStatus'
import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth";
import syncTodos from "./services/sync";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Open') 
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');


   const isOnline = useOnlineStatus();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser(user);
      }else{
        setUser(null)
      }
    });
    return () => unsuscribe();

  }, [])

  useEffect(() => {
    if (navigator.onLine) {
        syncTodos();
    }
      }, []);

  useEffect(() => {
    if(user){
      fetchTodos(user.uid);
    }else{
      setTodos([])
    }
  }, [user])
  
  //Auth
  const handleLogin = async (email, password) => {
    try{
      const loggedUser = await loginUser(email, password);
      setUser(loggedUser);
    }catch(error){
      console.log(error);
    }
  };

  const handleRegister = async (email, password) => {
    try{
      const newUser = await registerUser(email, password);
      setUser(newUser);
      return newUser;
    }catch(error){
      console.log('Error at register', error.message);
      throw error;
    }
    
  };




  const handleLogout = async () => {
    try{
      await logoutUser();
      setUser(null);
      setTodos([]);
    }catch(error){
      console.log(error);
    }
  }

  //To-Do functions
  const fetchTodos = async(userId) => {
    try{
      const userTodos = await getTodos(userId);
      setTodos(userTodos);
 
    }catch(error){
      console.log(error);
    }
  };

  const handleAddTodo = async (newTodo) => {
    if(!user) {return};
    try{
      const newTask = await addTodo(user.uid, newTodo);
      setTodos([...todos, newTask]);

    }catch(error){
      console.log(error);
    }
  };

  const handleCompleteTodo = async(todoId) => {
    try{
      await completeTodo(todoId);
      setTodos(todos.map((todo) => todo.id === todoId ? {...todo, complete: true} : todo));

    }catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async(todoId) => {
    try{
      await deleteTodo(todoId);
      setTodos(todos.filter((todo) => todo.id !== todoId));
    }catch(error){
      console.log(error);
    }
  } 

  
  


  

  return (
    <>
    {!isOnline && (
      <div style={{
        backgroundColor: 'red',
        padding: '10px',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderRadius: 10
      }}>
          You are working offline. Changes will synchronize when you get back online
      </div>
    )}
      {!user ? (
        <div>
          {authMode === 'login' ? (
            <Login handleLogin={handleLogin} setAuthMode={setAuthMode} setUser={setUser}/>
          ) : (
            <Register handleRegister={handleRegister} setAuthMode={setAuthMode} setUser={setUser} />
          )}
        </div>
      ) : (
        <>
          <Header 
            user={user} 
            todos={todos}
          />

          <Logout 
            handleLogout={handleLogout} 
            setUser={setUser}
          />
          <Tabs 
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
            todos={todos} 
          />
          <TodoInput 
            handleAddTodo={handleAddTodo} 
            isOnline={isOnline}
          />
          <TodoList
            todos={todos}
            selectedTab={selectedTab}
            handleDeleteTodo={handleDeleteTodo}
            handleCompleteTodo={handleCompleteTodo}
          />
        </>
      )}
    </>
  );
}


export default App
