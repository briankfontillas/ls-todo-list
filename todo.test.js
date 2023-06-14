const Todo = require('./todo');
const TodoList = require('./todo-list');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('toArray returns a copy of the todolist array', () => {
    const mainArray = list.todos;

    expect(list.toArray()).toBeTruthy();
    expect(list.toArray()).not.toBe(mainArray);
  });

  test('calling toArray returns a list of todos in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first element of the todos array', () => {
    expect(list.first()).toBe(todo1);
  });

  test('calling last returns the last element of the todos array', () => {
    expect(list.last()).toBe(todo3);
  });

  test('shift removes first element of the todos array and returns removed element',
    () => {
      expect(list.shift()).toBe(todo1);
      expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('pop removes last element of todos array and returns removed element', () => {
    expect(list.pop()).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('isDone to be true when all elements values = true', () => {
    expect(list.isDone()).toBe(false);

    list.markAllDone();

    expect(list.isDone()).toBe(true);
  });

  test('add throws TypeError if argument is not a todo object', () => {
    expect(() => {list.add(2)}).toThrow(TypeError);
    expect(() => {list.add('helloworld')}).toThrow(TypeError);
    expect(() => {list.add(new Todo('Take out the garbage'))}).not.toThrow(TypeError);
  });

  test('itemAt returns item at desired index (will throw an error if index is not valid', () => {
    expect(list.itemAt(0)).toBe(todo1);
    expect(list.itemAt(1)).toBe(todo2);
    expect(list.itemAt(2)).toBe(todo3);
    expect(() => list.itemAt(6)).toThrow(ReferenceError);
  });

  test('markDoneAt marks desired todo as done (will throw an error if index is not valid',
    () => {
      list.markDoneAt(0);

      expect(todo1.isDone()).toBe(true);
      expect(todo2.isDone()).toBe(false);
      expect(() => list.markDoneAt(10)).toThrow(ReferenceError);
  });

  test('markUndoneAt marks todo as undone (will throw an error if index isnt valid', () => {
    list.markAllDone();
    list.markUndoneAt(0);

    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(true);
    expect(() => list.markUndoneAt(9)).toThrow(ReferenceError);
  });

  test('markAllDone marks all todos in list as done', () => {
    expect(list.isDone()).toBe(false);

    list.markAllDone();

    expect(list.isDone()).toBe(true);
  });

  test('removeAt removes todo from the list (throws an error if index isnt valid)', () => {
    expect(() => list.removeAt(10)).toThrow(ReferenceError);
    expect(list.removeAt(0)).toEqual([todo1]);
    expect(list.toArray).not.toContain(todo1);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);

    string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room`;

    list.pop();
    expect(list.toString()).toBe(string);
  });

  test('forEach iterates over the list of todos', () => {
    let count = 0;
    list.forEach(todo => {
      count += 1;
    });

    expect(count).toBe(list.toArray().length);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);
  
    expect(newList.title).toBe(list.title);
  
    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});