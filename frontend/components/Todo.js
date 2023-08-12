import React from 'react'

export default class Todo extends React.Component {
  render() {
    return (
      <>
      {this.props.todos.reduce((acc, todo) => {
          if (this.props.displayCompleted || !todo.completed) 
          return acc.concat(
          <li 
          onClick={this.props.toggleCompleted(todo.id)} 
          key={todo.id} 
          className="todo"
          >
            {todo.name}{todo.completed ? ' ✔️' : ''}
          </li>   
          );
          return acc;
        }, [])}
      </>
    )
  }
}
