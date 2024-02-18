import { createStore } from 'redux'

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'

const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  }
}

const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id: parseInt(id),
  }
}

const reducer = (state = [], action) => {
  console.log(state, action)
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state]
    case DELETE_TODO:
      return state.filter((toDo) => toDo.id !== action.id)
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

export const actionCreators = {
  addTodo,
  deleteTodo,
}

export default store
