import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';
import { Redirect } from 'react-router'
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    };
    this.handleData = this.handleData.bind(this);
  }
  async handleData(e) {
    e.preventDefault()
    const {password, username} = this.state
    if(password && username) {
      const response = await fetch('http://127.0.0.1:5000/api/users', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({'password':password, 'username': username})
      })
      const json = await response.json()
      this.setState({
        redirect: true
      })
      return json
    }
  }
  componentDidMount() {
    this.setState({
      redirect: false
    })
  }
  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="user" value={this.state.username} onChange={e => this.setState({
        username: e.target.value})} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({
        password: e.target.value})} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.handleData}>
          Submit
        </Button>
        {this.state.redirect && <Redirect to="/login"></Redirect>}
      </Form>
    );
  }
}

export default SignUp;