import { createStore } from 'redux'
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from '@reduxjs/toolkit'

// const addTodo = createAction('ADD_TODO')
// const deleteTodo = createAction('DELETE_TODO')

// const reducer = (state = [], action) => {
//   console.log(state, action)
//   switch (action.type) {
//     case addTodo.type:
//       return [{ text: action.payload, id: Date.now() }, ...state]
//     case deleteTodo.type:
//       return state.filter((toDo) => toDo.id !== action.payload)
//     default:
//       return state
//   }
// }

// const reducer = createReducer([], (builder) => {
//   builder
//     .addCase(addTodo, (state, action) => {
//       return state.concat({ text: action.payload, id: Date.now() })
//     })
//     .addCase(deleteTodo, (state, action) => {
//       return state.filter((toDo) => toDo.id !== action.payload)
//     })
// })

const toDos = createSlice({
  name: 'toDoReducer',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() })
    },
    remove: (state, action) => {
      state.filter((toDo) => toDo.id !== action.payload)
    },
  },
})

// const store = createStore(reducer)
const store = configureStore({ reducer: toDos.reducer })

console.log(toDos.actions)

store.subscribe(() => {
  console.log(store.getState())
})

export const { add, remove } = toDos.actions

export default configureStore({ reducer: toDos.reducer })
