import React, { useState } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from '../store'
import Todo from '../components/ToDo'

function Home({ toDos, addTodo }) {
  const [text, setText] = useState('')
  const onChange = (event) => {
    setText(event.target.value)
  }

  function onSubmit(event) {
    event.preventDefault()
    setText('')
    addTodo(text)
  }

  return (
    <>
      <h1>To do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <Todo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  )
}

function mapStateToProps(state) {
  console.log(state)
  return { toDos: state }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (text) => dispatch(actionCreators.addTodo(text)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
