import { useState } from "react";

const TodoInput = (props) => {
  const { handleAddTodo } = props;
  const [inputValue, setInputValue] = useState('');

  const changeValue = (e) => {
    setInputValue(e.target.value);
  }
  
  return (
    <div className="input-container">
        <input value={inputValue} onChange={changeValue} placeholder="Add task" />
        <button onClick={() => {
          if(!inputValue) {return};
          handleAddTodo(inputValue);
          setInputValue('');
        }}>
            <i className="fa-solid fa-plus"></i>
        </button>
    </div>
  )
}

export default TodoInput