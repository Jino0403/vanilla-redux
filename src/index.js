import { createStore } from 'redux'

const form = document.querySelector('form')
const input = document.querySelector('input')
const ul = document.querySelector('ul')

const ADD_TODO = 'ADD_TODO'
const DELETE_TODO = 'DELETE_TODO'

const addTodo = (text) => {
  return { type: ADD_TODO, text }
}

const deleteTodo = (id) => {
  return { type: DELETE_TODO, id }
}

const reducer = (state = [], action) => {
  console.log(action)
  switch (action.type) {
    case ADD_TODO:
      const newTodoObj = { text: action.text, id: Date.now() }
      return [...state, newTodoObj]
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id)
      return cleaned
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
})

const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text))
}

const dispatchDeleteTodo = (event) => {
  const id = parseInt(event.target.parentNode.id)
  store.dispatch(deleteTodo(id))
}

const paintTodo = () => {
  const toDos = store.getState()
  ul.innerHTML = ''
  toDos.forEach((toDo) => {
    const li = document.createElement('li')
    const btn = document.createElement('button')
    btn.innerText = 'Delete'
    btn.addEventListener('click', dispatchDeleteTodo)
    li.id = toDo.id
    li.innerText = toDo.text
    ul.appendChild(li)
    li.appendChild(btn)
  })
}
store.subscribe(paintTodo)

const onSubmit = (event) => {
  event.preventDefault()
  const toDo = input.value
  input.value = ''
  dispatchAddTodo(toDo)
}

form.addEventListener('submit', onSubmit)
