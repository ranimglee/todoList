import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' }, // Default route
  { path: 'todos', component: TodoListComponent }, // List all todos
  { path: 'create', component: TodoFormComponent }, // Create a new todo
  { path: 'edit/:id', component: TodoFormComponent } // Edit an existing todo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
