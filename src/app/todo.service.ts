import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  constructor() {
    const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
    this.todos = todos;
  }

  switchDone(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos[index].done = !this.todos[index].done;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo: Todo) {
    this.todos.push({
      id: getId(4),
      title: todo.title,
      content: todo.content,
      done: todo.done,
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteById(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  editTodoById(id: string, todo: Todo) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    todo.id = id;
    this.todos[index] = todo;
    console.log(this.todos);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }
}


/**
 * generate groups of 4 random characters
 * @example getId(1) : 607f
 * @example getId(4) : 95ca-361a-f8a1-1e73
 */
export function getId(parts: number): string {
  const stringArr = [];
  for(let i = 0; i< parts; i++){
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}
