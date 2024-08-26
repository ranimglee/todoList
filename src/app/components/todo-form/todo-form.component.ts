import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todoId: number | undefined;
  todoForm: FormGroup;
  todo: Todo | undefined;
  isEditMode: boolean = false;  // Add this property

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,private router: Router, private route: ActivatedRoute 
  ) {
    this.todoForm = this.fb.group({
      title: [''],
      description: [''],
      isCompleted: [false],
    });
  }

  ngOnInit(): void {
    this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.todoId;  // Determine if we are in edit mode
    if (this.isEditMode) {
      this.loadTodo();
    }
  }

  loadTodo(): void {
    if (this.todoId) {
      this.todoService.getTodoById(this.todoId).subscribe({
        next: (todo) => {
          this.todo = todo;
          this.todoForm.patchValue(todo);
        },
        error: (err) => console.error(err)
      });
    }
  }

  saveTodo(): void {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      formValue.createdAt = new Date().toISOString();  // Add this line
  
      if (this.isEditMode && this.todoId) {
        this.todoService.updateTodo(this.todoId, formValue).subscribe({
          next: () => console.log('Todo updated successfully'),
          error: (err) => console.error('Error updating todo:', err)
        });
      } else {
        this.todoService.createTodo(formValue).subscribe({
          next: () => console.log('Todo created successfully'),
          error: (err) => console.error('Error creating todo:', err)
        });
      }
    } else {
      console.error('Form is invalid');
    }
  }

  goBack() {
    this.router.navigate(['/todos']); // Replace '/previous-route' with the actual route you want to navigate to
  }
}
