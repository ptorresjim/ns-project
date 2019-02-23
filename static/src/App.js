import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import Task from './components/assingtask'
import Login from './components/login'
import SignUp from './components/signup'
import MyTasks from './components/mytasks'
import {getLS, removeLS} from './utils/index'
class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  async handleLogout() {
    const token = localStorage.getItem('token')
    const response = await fetch('http://127.0.0.1:5000/api/logout', {
      method:'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if(response.status === 200) {
      removeLS()
      window.location.href = '/login'
    }
  }
  render() {
    const token = getLS()
    return (
      <div className="App container">
        <ul>
          {token && <li><Link to="/assingtask">Asign task</Link></li>}
          {token && <li><Link to="/mytasks">My tasks</Link></li>}
          {!token && <li><Link to="/login">Login</Link></li>}
          {!token && <li><Link to="/signup">SignUp</Link></li>}
          {token && <li><a onClick={this.handleLogout} href='#'>Logout</a></li>}
        </ul>
        <Route exact path='/signup' component={SignUp}/>
        <Route exact path='/assingtask' render={(props) => <Task {...props} token={token} redirect={token === null}/>}/>
        <Route exact path='/mytasks'render={(props) => <MyTasks {...props} token={token} redirect={token === null}/>}/>
        <Route exact path='/login' component={Login}/>
      </div>
    );
  }
}

export default App;
