import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
        <form id="form" onSubmit={this.props.onTodoFormSubmit}>

          <input 
            placeholder="What else...?"
            type="text"
            value={this.props.todoNameInput}
            onChange={this.props.todoNameChange}
          />

          <input type="submit" />

        </form>

        <button onClick={this.props.toggleDisplayCompleted}>
          {this.props.displayCompleted ? 'Hide' : 'Show'} Completed
        </button>
      </>
    )
  }
}
