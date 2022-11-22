import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  @Input()
  todoId!: string | undefined;

  todo: Todo | undefined;

  isInEditMode: boolean = false;

  editTodoForm;


  constructor(
    private todoService: TodoService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.editTodoForm = this.formBuilder.group({
      title: '',
      content: '',
      done: false,
      dueDate: new Date(),
    });
  }

  getDateAsString() {
    if (!this.todo) {
      return 'No Date!';
    }
    let options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(this.todo.dueDate).toLocaleDateString('de-DE', options);
  }

  ngOnInit(): void {
    if (!this.todoId) {
      this.openSnackBar('Cant get ToDo', '');
      return;
    }
    this.todo = this.todoService.getTodoById(this.todoId);
    this.editTodoForm.setValue({
      title: this.todo?.title as string,
      content: this.todo?.content as string,
      done: this.todo?.done as boolean,
      dueDate: this.todo?.dueDate as Date,
    });
  }

  switchDone() {
    if (!this.todo) {
      this.openSnackBar('Cant switch done', '');
      return;
    }
    this.todoService.switchDone(this.todo.id as string);
  }

  openSnackBar(message: string, action: string) {
    return this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  discardChanges() {
    if (!this.todo) {
      this.openSnackBar('Cant discard changes', '');
      return;
    }
    this.todoService.addTodo({...this.todo})
    this.todoService.deleteById(this.todo.id as string);
  }

  onEdit() {
    if (this.isInEditMode) {
      this.discardChanges();
    }
    this.isInEditMode = !this.isInEditMode;
  }

  onDelete() {
    if (!this.todoId) {
      this.openSnackBar('Cant delete ToDo', '');
      return;
    }

    this.openSnackBar('Todo deleted', '');
    this.todoService.deleteById(this.todoId);
  }

  saveChanges() {
    if (!this.todo) {
      this.openSnackBar('Cant save changes', '');
      return;
    }
    this.todoService.editTodoById(this.todoId as string, this.editTodoForm.value as Todo);
  }


  onSubmit() {
    this.saveChanges();
  }
}

