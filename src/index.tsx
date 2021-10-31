import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from 'context/auth'
import PrivateRoute from 'components/PrivateRoute/PrivateRoute'
import VideoList from 'pages/VideoList/VideoList'
import ShareVideo from 'pages/ShareVideo/ShareVideo'
import './config/styles/index.scss'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={VideoList} />
          <PrivateRoute path="/share" component={ShareVideo} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
