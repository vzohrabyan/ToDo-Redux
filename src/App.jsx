import { useRef, useState } from "react";
import {RiDeleteBin6Line} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => {return state})
  const [value, setValue] = useState(""); 
  const [isFilled, setIsFilled] = useState(true);
  const [editedValue, setEditedValue] = useState(""); 
  const warning = useRef(0);
  const emptyEdit = useRef(0);

  const addTodo = () => {
    if (value.trim()) {
      dispatch({ 
        type: "add-todo",
        payload: {
          id: state.length ? (state[state.length - 1].id + 1) : 1,
          todo: value,
          isCompleted: false,
          isEdited: false
        }
      });
      setIsFilled(true)
      warning.current.style.border = "1px solid #ccc"
      setValue(""); 
    } else {
      setIsFilled(false)
      warning.current.style.border = "1px solid red"
    }
  };

  const delTodo = (id) => {
    dispatch({ 
      type: "del-todo",
      payload: id
    });
  };

  const comTodo = (id) => {
    console.log(state);
    dispatch({ 
      type: "com-todo",
      payload: id
    });
  };

  const editTodo = (id) => {
    dispatch({ 
      type: "edit-todo",
      payload: id
    });
    setEditedValue("")
  };

  const setEditedTodo = (id) => {
    if (editedValue.trim()) {
      dispatch({ 
        type: "set-edit-todo",
        payload: [id, editedValue]
      });
      emptyEdit.current.style.border = "#ccc 1px solid"
    } else {
      emptyEdit.current.style.border = "red 1px solid"
    }
    
  };

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input
        ref={warning}
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        {!isFilled && <p>Fill in at least one field to add your todo</p>}
        <button type='submit'>Add</button>
      </form>
        <div className='todos'>
          {state.map(({id, todo, isCompleted, isEdited}, index) => {
            return (
              <div key={index} className='list'>
                {!isEdited ? (
                <>
                {isCompleted ? (
                    <input type="checkbox" checked onClick={() => {comTodo(id)}} />
                  ) : (
                    <input type="checkbox" onClick={() => {comTodo(id)}} />
                  )}
                  <span style={{textDecoration: isCompleted? "line-through": "none"}} >{todo}</span>
                  <button type='button' style={{backgroundColor: "green"}} onClick={() => {editTodo(id)}} >Edit</button>
                  <button type='button' className="delete" onClick={() => {delTodo(id)}}><RiDeleteBin6Line /></button>
                </>) 
                : (
                  <>
                    <input type="text" ref={emptyEdit} value={editedValue} onChange={(event) => setEditedValue(event.target.value)} />
                    <button type='button' onClick={() => {setEditedTodo(id)}} >Edit</button>
                  </>
                )
                }
                
              </div>
            ) 
          })}
        </div>
    </div>
  );
}

export default App;
