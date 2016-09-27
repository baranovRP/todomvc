/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import TodoList from './todolist';

const document = window.document;

const _extends = Object.assign || function (target) {
  for (let i = 1; i < arguments.length; i++) {
    const source = arguments[i];
    for (let key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

const todos = {
  1: { done: false, text: 'Решить все задания 4 модуля' },
  2: { done: false, text: 'Заплатить за 5 модуль' },
  3: { done: false, text: 'Победить лень' },
  4: { done: false, text: 'Захватить мир' },
};

const todoList = new TodoList({
  todos,
  node: document.querySelector('todos'),
  onTodoStateChanged(id) {
    this.todos = _extends({}, this.todos, {
      [id]: _extends({}, this.todos[id], { done: !this.todos[id].done }),
    });
  },
  onTodoRemoved(id) {
    const newTodos = _extends({}, this.todos);
    delete newTodos[id];
    this.todos = newTodos;
  },
  onTodoAdd(text) {
    this.todos = _extends({}, this.todos, {
      [Math.random().toString(16).substr(2)]: { done: false, text },
    });
  },
});

