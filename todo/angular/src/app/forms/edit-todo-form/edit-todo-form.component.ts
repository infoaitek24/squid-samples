import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ListService } from '../../services/list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-edit-todo-form',
  templateUrl: 'edit-todo-form.component.html',
  styleUrls: ['edit-todo-form.component.scss'],
})
export class EditTodoFormComponent implements OnInit, OnDestroy {
  @Input('dialog') dialog?: DialogRef<string>;
  @Input('todoId') todoId?: string;
  editTodoForm?: FormGroup;
  todoSub?: Subscription;
  constructor(private listService: ListService, readonly themeService: ThemeService) {}
  ngOnInit(): void {
    if (this.todoId) {
      this.todoSub = this.listService.observeList(this.todoId).subscribe(todo => {
        this.editTodoForm = new FormGroup({
          title: new FormControl(todo.title, Validators.required),
        });
      });
    }
  }
  onSubmit(): void {
    if (this.todoId && this.editTodoForm) {
      this.listService.changeList(this.todoId, this.editTodoForm.get('title')?.value);
      this.editTodoForm.reset();
      this.dialog?.close();
    }
  }
  ngOnDestroy(): void {
    this.todoSub?.unsubscribe();
  }
}
