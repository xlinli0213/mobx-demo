import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { autorun, toJS } from 'mobx';
import './TodoList.css';

@inject('store')
@observer
class AddTodo extends Component {
  render() {
    const { inputText, addTodo, changeInput } = this.props.store;
    return (
      <div className='addTodo'>
        <input
          type='text'
          className='addTodo-input'
          placeholder='Add someting todo'
          value={inputText}
          onChange={(e) => changeInput(e.target.value)}
        />
        <button className='addTodo-button' onClick={addTodo}>
          Add
        </button>
      </div>
    );
  }
}

@inject('store')
@observer
class Filter extends Component {
  render() {
    const { filter, changeFilter } = this.props.store;
    return (
      <div className='filter'>
        {['All', 'Completed', 'UnCompleted'].map((text) => (
          <div
            className={`filter-label${filter === text ? ' active' : ''}`}
            onClick={() => changeFilter(text)}
          >
            {text}
          </div>
        ))}
      </div>
    );
  }
}

@inject('store')
@observer
class TodoList extends Component {
  render() {
    const {
      showTodoList,
      deleteTodo,
      changeTodoStatus,
      changeTodoText,
    } = this.props.store;
    return (
      <div className='todoList'>
        {showTodoList.map((todo) => (
          <div className='todoList-item' key={todo.id}>
            <input
              type='checkbox'
              id={todo.id}
              className='todoList-checkbox'
              checked={todo.completed}
              onChange={() => changeTodoStatus(todo.id)}
            />
            <label htmlFor={todo.id}></label>
            <input
              className='todoList-text'
              type='text'
              value={todo.text}
              onChange={(e) => changeTodoText(todo.id, e.target.value)}
            />
            <button
              onClick={() => deleteTodo(todo.id)}
              className='todoList-close'
            >
              ×
            </button>
          </div>
        ))}
      </div>
    );
  }
}

@inject('store')
@observer
class Todos extends Component {
  constructor(props) {
    super(props);
    this.disposer = autorun(() =>
      console.log(JSON.stringify(toJS(this.props.store.todoList), null, 2))
    );
  }

  render() {
    return (
      <div className='todos'>
        <AddTodo />
        <Filter />
        <TodoList />
      </div>
    );
  }

  componentWillUnmount() {
    this.disposer();
  }
}

export default Todos;
