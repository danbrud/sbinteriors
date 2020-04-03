import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { StoreProvider } from './utils'
import { AppState } from './stores/AppState.store'

const state = new AppState()

ReactDOM.render(
  <StoreProvider value={state}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()