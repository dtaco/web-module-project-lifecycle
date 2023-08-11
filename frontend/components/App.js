import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      todos: [],
    }
  }

  fetchAllTodos = () => {

  }

  componentDidMount() {
    
  }

  render() {
    return null
  }
}
