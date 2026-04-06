import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiUrl = 'https://jsonplaceholder.typicode.com/todos';


  constructor(private http: HttpClient) { }

 getTodos() {
  return this.http.get(this.apiUrl);
}

}
