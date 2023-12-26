/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  // Constructor method
  constructor() {
    // Initialize the todos property as an empty array
    this.todos = [];
  }

  // Add todo.
  add(todo) {
    this.todos.push(todo);
  }

  // Select a todo which we have to remove.
  remove(index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
    }
  }

  // This method will take 2 argument, 1.Index of todo which we have to update, 2. What we have to update.
  update(index, updateTodo) {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index] = updateTodo;
    }
  }

  // Just return the the todo
  getAll() {
    return this.todos;
  }

  // Just return the todo, which we clicked
  get(index) {
    if (index >= 0 && index < this.todos.length) {
      return this.todos[index];
    } else {
      return null;
    }
  }

  // Clear the todo.
  clear() {
    this.todos = [];
  }
}

module.exports = Todo;
