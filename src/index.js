import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {injectGlobal} from 'styled-components'

// Default styles for entire page
injectGlobal`
  * {
    margin: 0;
    padding: 0;
    display: flex;
   }
`


ReactDOM.render(
  <Router>
    <Route exact path='/' component={App} />
  </Router>,
  document.getElementById('root'))
