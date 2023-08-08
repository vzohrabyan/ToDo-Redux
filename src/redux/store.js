import { createStore } from "redux";

function reducer(state, action) {
    switch (action.type) { 
      case "add-todo":
        return [...state, action.payload];
      case "del-todo": 
        return state.filter((todo) => todo.id !== action.payload);
      case "com-todo": 
        return  state.map((todo) => {
          if (todo.id === action.payload) {
            todo.isCompleted = !todo.isCompleted
          }
      return todo
    });
    case "edit-todo": 
      return  state.map((todo) => {
        if (todo.id === action.payload) {
          todo.isEdited = !todo.isEdited
        }
        return todo
      });
    case "set-edit-todo": 
      return  state.map((todo) => {
        if (todo.id === action.payload[0]) {
          todo.isEdited = !todo.isEdited;
          todo.todo = action.payload[1];
        }
        return todo
      });
      default:
        return state;
    }
}

const store = createStore(reducer, [])

export default store