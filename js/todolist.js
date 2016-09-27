/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

const document = window.document;

const keyEvent = { VK_ENTER: 13 };

export default function TodoList(obj) {
  this.todos = obj.todos;
  this.node = obj.node;
  this.onTodoStateChanged = obj.onTodoStateChanged;
  this.onTodoRemoved = obj.onTodoRemoved;
  this.onTodoAdd = obj.onTodoAdd;
  this.render();
}

TodoList.prototype.render = function () {
  const self = this;
  this.node.innerHTML = '';
  addAllItems(self);

  self.node.addEventListener('click', event => {
    const target = event.target;
    const targetParent = event.target.parentNode;
    if (target.classList.contains('remove')) {
      self.onTodoRemoved(targetParent.dataset.id);
      renderList(self);
    }
  });

  self.node.addEventListener('dblclick', event => {
    const target = event.target;
    const targetParent = event.target.parentNode;
    if (target.classList.contains('item')) {
      self.onTodoStateChanged(target.dataset.id);
    } else if (targetParent.classList.contains('item')) {
      self.onTodoStateChanged(targetParent.dataset.id);
    }
    renderList(self);
  });

  document.addEventListener('keydown', event => {
    if (event.keyCode === keyEvent.VK_ENTER) {
      const input = self.node.querySelector('input');
      if (input.value === '') {
        return;
      }
      self.onTodoAdd(input.value);
      renderList(self);
    }
  });
};

TodoList.prototype.getTodos = function () {
  return this.todos;
};

TodoList.prototype.setTodos = function (list) {
  this.todos = list;
};

function renderList(obj) {
  obj.node.innerHTML = '';
  addAllItems(obj);
}

function addAllItems(obj) {
  const tds = obj.getTodos();
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'add todo';
  const ul = document.createElement('ul');
  ul.style = 'list-style: none; padding: 0;';
  ul.innerHTML = '';
  for (const prop of Object.keys(tds)) {
    let strikeText = '';
    if (tds[prop].done) {
      strikeText = 'style="text-decoration: line-through;"';
    }
    ul.innerHTML += `
      <li class="item" data-id="${prop}" data-done="${tds[prop].done}">
        <label ${strikeText}>${tds[prop].text}</label>
        <button class="remove" style="border: none; background: none;">x</button>
      </li>
    `;
  }
  obj.node.appendChild(input);
  obj.node.appendChild(ul);
}
