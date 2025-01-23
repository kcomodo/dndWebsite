import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:1337'; // Base URL for the backend
  constructor(private http: HttpClient) {

  }
  validateLogin(clientEmail: string, clientPW: string): Observable<any> {
    console.log("testing validateLogin");

    const body = { clientEmail, clientPW };
    return this.http.post(`${this.baseUrl}/login`, body);

  }
}
