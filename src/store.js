import { configure, observable, computed, action } from 'mobx';
configure({ enforceActions: 'always' });

class TodoListData {
  @observable inputText = '';
  @observable todoList = [];
  @observable filter = 'All';
  @observable cid = 0;

  @computed get showTodoList() {
    let showTodoList = this.todoList;
    this.filter === 'Completed' &&
      (showTodoList = this.todoList.filter((todo) => todo.completed));
    this.filter === 'UnCompleted' &&
      (showTodoList = this.todoList.filter((todo) => !todo.completed));
    return showTodoList;
  }

  @action.bound
  addTodo() {
    if (this.inputText) {
      this.todoList.push({
        id: `todo-${this.cid++}`,
        text: this.inputText,
        completed: false,
      });
      this.inputText = '';
    }
  }

  @action.bound
  deleteTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  @action.bound
  changeInput(value) {
    this.inputText = value;
  }

  @action.bound
  changeFilter(filter) {
    this.filter = filter;
  }

  @action.bound
  changeTodoStatus(id) {
    this.todoList.find(
      (todo) => todo.id === id && (todo.completed = !todo.completed)
    );
  }

  @action.bound
  changeTodoText(id, value) {
    this.todoList.find((todo) => todo.id === id && (todo.text = value));
  }
}

export default new TodoListData();
