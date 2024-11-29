import { useState } from "react";

const TodoInput = ({handleAddTodo}) => {
 const [inputValue, setInputValue] = useState('');

  const changeValue = (e) => {
    setInputValue(e.target.value);
  }

  const handleAddClick = () => {
    if(inputValue.trim()){
      handleAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if(e.key === 'Enter' && inputValue.trim()){
      handleAddTodo(inputValue.trim());
      setInputValue('');
    }
  };


  
  return (
    <div className="input-container">
        <input value={inputValue} 
        onChange={changeValue} 
        placeholder="Add task"
        onKeyDown={handleKeyDown}
        />
        <button 
        onClick={handleAddClick}
        >
            <i className="fa-solid fa-plus"></i>
        </button>
    </div>
  )
}

export default TodoInput