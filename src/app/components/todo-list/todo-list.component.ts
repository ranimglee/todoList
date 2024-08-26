import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { id: 0, title: '', isCompleted: false, description: '', createdAt: '' }; // Initialize newTodo with all properties
  todoToDelete: number | null = null; // Use null as default value

  constructor(private todoService: TodoService) {}




  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      (data: Todo[]) => {
        this.todos = data;
      },
      (error) => {
        console.error('Error fetching todos', error);
      }
    );
  }

  addTodo(newTodo: Todo): void {
    this.todoService.createTodo(newTodo).subscribe(
      (data: Todo) => {
        this.todos.push(data);
      },
      (error) => {
        console.error('Error creating todo', error);
      }
    );
  }
  showDeleteConfirmation(todoId: number) {
    const confirmationCard = document.querySelector('.delete-confirmation-card') as HTMLElement | null;
    if (confirmationCard) {
      confirmationCard.style.display = 'block';
      this.todoToDelete = todoId; // Store the ID of the todo to delete
    }
  }

  hideDeleteConfirmation() {
    const confirmationCard = document.querySelector('.delete-confirmation-card') as HTMLElement | null;
    if (confirmationCard) {
      confirmationCard.style.display = 'none';
    }
  }

  confirmDelete() {
    if (this.todoToDelete !== null) {
      this.deleteTodo(this.todoToDelete);
      this.hideDeleteConfirmation();
    }
  }
  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe({
      next: () => this.loadTodos(),
      error: (err) => console.error(err)
    });
  }

  toggleComplete(todo: Todo): void {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo.id, todo).subscribe({
      next: () => this.loadTodos(),
      error: (err) => console.error(err)
    });
  }

  resetNewTodo(): void {
    this.newTodo = { id: 0, title: '', isCompleted: false, description: '', createdAt: '' }; // Reset newTodo
  }

  
}
