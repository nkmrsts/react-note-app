import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './firebase/initializeApp'
import './index.css'
import { unregister } from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister()

if (module.hot) {
  module.hot.accept()
}
