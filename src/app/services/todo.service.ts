import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8000/api/todolist';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }
  createTodo(todo: Todo): Observable<Todo> {
    // Define the headers
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Log the todo for debugging purposes
    console.log(todo);

    // Return the observable
    return this.http.post<Todo>(`${this.apiUrl}/create`, JSON.stringify(todo), { headers })
      .pipe(
        catchError((error) => {
          console.error('Error creating todo:', error);
          throw error; // Rethrow the error for further handling
        })
      );
  }

 /* saveTodo(todo: any) {
    return this.http.post(`${this.apiUrl}/create`, todo);
  }
*/
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/update/${id}`);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  updateTodo(id: number, todo: Todo): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, todo);
  }

  
}
