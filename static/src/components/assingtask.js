import React, { Component } from 'react'
import {Form, Button} from 'react-bootstrap'
import {request, setLS, getLS, removeLS} from '../utils/index'
import { Redirect } from 'react-router'
class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      taskTitle: getLS('taskTitle') || '',
      taskDescription: getLS('taskDescription') || '',
      assignee: 1,
      redirect: props.redirect
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const data = await request({
      url: 'http://127.0.0.1:5000/api/users',
      method:'GET',
      headers: {
        'Authorization': `Bearer ${this.props.token}`
      }
    })
    this.setState({
      users: data,
    })
  }
  handleInputChange(e, key) {
    this.setState({
      [key]: e.target.value
    })
    setLS(key, e.target.value)
  }
  async handleSubmit(e) {
    e.preventDefault()
    const title =  this.state.taskTitle
    const description = this.state.taskDescription
    if(!title && !description) {
      return alert('Please provide all the fields')
    }
    const data = await request({
      url: `http://127.0.0.1:5000/api/tasks/${this.state.assignee}`,
      method:'POST',
      headers: {
        'Authorization': `Bearer ${this.props.token || getLS()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    })
    removeLS('taskTitle')
    removeLS('taskDescription')
    alert('Task created succcessfully')
    return data
  }
  render() {
    return (
      <div>
        <h3>Assign Task</h3>
        <Form>
          <Form.Control type="text" placeholder="Name of the task" value={this.state.taskTitle} onChange={ (e) => this.handleInputChange(e, 'taskTitle') }/>
          <Form.Control className="mt-4 mb-4" type="text" placeholder="Description" value={this.state.taskDescription} onChange={ (e) => this.handleInputChange(e, 'taskDescription') }/>
          <Form.Control as="select" onChange={ (e) => this.handleInputChange(e, 'assignee')}>
            { this.state.users.length > 0 &&
              this.state.users.map(item => <option key={item.id} value={item.id} defaultValue={this.state.assignee}>{item.username}</option>)
            }
          </Form.Control>
          <Button type="submit" className="mt-4" onClick={this.handleSubmit}>
            Submit
          </Button>
          {this.state.redirect && <Redirect to="/"></Redirect>}
        </Form>
      </div>
    );
  }
}

export default Task;