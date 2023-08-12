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
      displayCompleted: true,
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

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({
        ...this.state, todos: this.state.todos.map(todo => {
          if(todo.id !== id) return todo;
          return res.data.data
        })
      })
    })
    .catch(this.setAxiosResError)
  }

  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
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
        {this.state.todos.reduce((acc, todo) => {
          if (this.state.displayCompleted || !todo.completed) return acc.concat(<li onClick={this.toggleCompleted(todo.id)} key={todo.id} className="todo">{todo.name}{todo.completed ? ' ✔️' : ''}</li>   
          );
          return acc;
        }, [])}
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

        <button onClick={this.toggleDisplayCompleted}>{this.state.displayCompleted ? 'Hide' : 'Show'} Completed</button>
      </div>
    )
  }
}
