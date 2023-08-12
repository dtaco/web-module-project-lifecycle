import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <>
      <ul  id="todos">
        <Todo 
        todos={this.props.todos}
        displayCompleted={this.props.displayCompleted}
        toggleCompleted={this.props.toggleCompleted}
        />
      </ul>
      </>
    )
  }
}
