class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("can only add Todo objects");
    }

    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    this.todos.shift();
  }

  pop() {
    this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(func) {
    this.todos.forEach(func);
  }

  filter(func) {
    let newList = new TodoList(this.title);
    this.forEach(todo => {
      if (func(todo)) newList.add(todo);
    });

    return newList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let firstNotDone = this.allNotDone()
      .filter(todo => todo.getTitle() === title)
      .first();

    if (firstNotDone) firstNotDone.markDone();
  }

  markAllDone() {
    this.forEach(todo => {
      if (!todo.isDone()) todo.markDone();
    });
  }

  markAllUndone() {
    this.forEach(todo => {
      if (todo.isDone()) todo.markUndone();
    });
  }

  toArray() {
    return this.todos.slice();
  }
}


let list = new TodoList('my list');
list.add(new Todo('Go to work'));
list.add(new Todo('Brush Teeth'));

console.log(list);

list.markAllDone();

console.log(list);

list.markAllUndone();

console.log(list);