import React, { Component } from 'react';
import { request, getLS } from '../utils/index'
import { Card } from 'react-bootstrap';
import { Redirect } from 'react-router'

class MyTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      redirect: props.redirect
    }
  }
  async componentDidMount() {
    const data = await request({
      method: 'GET',
      url: 'http://127.0.0.1:5000/api/tasks',
      headers: {
        'Authorization': `Bearer ${this.props.token || getLS()}`
      }
    })
    this.setState({
      data
    })
  }
  render() {
    return (
      <div>
        {this.state.data.length > 0 && this.state.data.map(item => <Card body key={item.id}>{item.title} - {item.description}</Card>)}
        {this.state.redirect && <Redirect to="/"></Redirect>}
      </div>
    );
  }
}

export default MyTasks;