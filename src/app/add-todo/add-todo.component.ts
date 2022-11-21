import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {

  addTodoForm;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.addTodoForm = this.formBuilder.group({
      title: '',
      content: '',
      done: false,
    });
  }



  onSubmit() {

    this.todoService.addTodo(this.addTodoForm.value as Todo);
    // this.addTodoForm.reset();
  }
}


