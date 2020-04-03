import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { StoreProvider } from './utils'


ReactDOM.render(
  <StoreProvider value={}>
    <App />
  </StoreProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()