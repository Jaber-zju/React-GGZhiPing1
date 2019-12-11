import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/css/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './redux/store'

import {HashRouter, Route,Switch} from "react-router-dom";
import {Provider} from 'react-redux'

import Main from './containers/main/main'
import Login from './containers/login/login'
import Register from './containers/register/register'

import './redux/actions'

const render = () => {
  ReactDOM.render(
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route component={Main}/>
          </Switch>
        </HashRouter>
      </Provider>
      , document.getElementById('root'))
}

render()

store.subscribe(render)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
