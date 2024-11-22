import Header from './components/Header'
import Tabs from './components/Tabs'
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'


const App = () => {
  const todos = [
     { input: 'Hello! Add your first todo!', complete: true },
     { input: 'Get the groceries!', complete: false },
     { input: 'Learn how to web design', complete: false },
     { input: 'Say hi to gran gran', complete: true },
     ];

  return (
    <>
      <Header todos={todos}/>
      <Tabs todos={todos}/>
      <TodoInput />
      <TodoList todos={todos}/>
    </>
  )
}

export default App