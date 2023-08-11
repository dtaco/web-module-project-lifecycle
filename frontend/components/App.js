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
    axios.get(URL)
      .then(res => {
        this.setState({
          ...this.state,
          todos: res.data.data
        })
        console.log(this.state.todos);
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return(
      <div className="App">
        <h1>What I have to do today is...</h1>
        {
          this.state.todos.map(todo => {
            return(
              <ul key={todo.id} id="todos">
                <li className="todo">
                {todo.name}
                </li>
              </ul>
            )
          })
        }
      </div>
    )
  }
}
