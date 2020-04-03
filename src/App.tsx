import React, { useState } from 'react'
import './App.css'
import { useStore } from './utils'
import { observer } from 'mobx-react'
import Todo from './components/Todo'

const App = observer(() => {
  const todos = useStore()
  const [input, setInput] = useState('')
  console.log(todos)

  return (
    <div>
      <input type="text" onChange={e => setInput(e.target.value)} />
      <button onClick={ () => todos.addTodo(input) }>add</button>
      {todos.todos.map(t => <Todo todo={t} />)}
    </div>
  )
})

export default App