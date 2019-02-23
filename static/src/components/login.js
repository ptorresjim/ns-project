import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import {request, toForm, setLS} from '../utils/index'
import { Redirect } from 'react-router'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    };
    this.handleData = this.handleData.bind(this);
  }
  componentDidMount() {
    this.setState({
      redirect: false
    })
  }
  async handleData(e) {
    e.preventDefault()
    const {password, username} = this.state
    if(!password && !username) {
      alert('please provide a username and a password')
      return
    }
    const body = await toForm(this.state)
    const data = await request({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/tokens',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
      },
      body
    })
    const {token} = data
    setLS('token', token)
    this.setState({
      redirect: true
    })
    return data
  }

  render() {
    return (
      <Form>
        <Form.Label>Login</Form.Label>
        <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={e => this.setState({
          username: e.target.value
        })}/>
        <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({
          password: e.target.value
        })}/>
        <Button type="submit" onClick={this.handleData}>
          Submit
        </Button>
        {this.state.redirect && <Redirect to="/mytasks"></Redirect>}
      </Form>
    );
  }
}

export default Login;