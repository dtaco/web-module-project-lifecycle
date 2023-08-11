import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {

  constructor () {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
    }
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          todos: res.data.data
        })
      })
      .catch(this.setAxiosResError)
  }

  todoNameChange = evt => {
    const { value } = evt.target;
    this.setState({
      ...this.state,
      todoNameInput: value
    })
    }
  
  resetForm = () => {
    this.setState({
      ...this.state, todoNameInput: ''
    })
  }

  setAxiosResError = (err) => {
    this.setState({
      ...this.state,
      error: 'Error: ' + err.response.data.message
      })
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput, completed: false})
    .then(res => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data) })
    })
    .catch(this.setAxiosResError)
  }

  onTodoFormSubmit = (evt) => {
    evt.preventDefault();
    this.postNewTodo();
    this.resetForm();
  }


  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return(
      <div className="App">
        <h1>What do I have to do today?</h1>

        <div id="error">{this.state.error}</div>

        <h2>To Do:</h2>

        <ul  id="todos">
        {this.state.todos.map(todo => {
            return(
                <li key={todo.id} className="todo">
                {todo.name}
                </li>
            );
          })
        }
        </ul>

        <form id="form" onSubmit={this.onTodoFormSubmit}>

          <input 
          placeholder="What else...?"
          type="text"
          value={this.state.todoNameInput}
          onChange={this.todoNameChange}
          />

          <input type="submit" />

        </form>
      </div>
    )
  }
}
