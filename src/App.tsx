import React, { useEffect } from 'react'
import './App.css'
import { useStore } from './utils'
import { observer } from 'mobx-react'


const App: React.FC = observer(() => {
  const state = useStore()

  useEffect(() => {
    state.getClients()
  }, [])

  return (
    <div>
      {state.clients.map(c => <div>{c.name}</div>)}
    </div>
  )
})

export default App