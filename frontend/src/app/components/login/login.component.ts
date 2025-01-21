import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true, // Marking it as standalone
  imports: [HttpClientModule], // Importing HttpClientModule
  templateUrl: './login.component.html', // Correctly referring to the HTML file
  styleUrls: ['./login.component.css'], // Correctly pluralized
})
export class LoginComponent {
  private baseUrl = 'http://localhost:1337'; // Base URL for the backend
  private loginUrl = 'http://localhost:1337/login';
  constructor(private http: HttpClient) { // Injecting HttpClient
    console.log("Testing LoginComponent");
    let clientEmail = "testing71@gmail.com";
    let clientPW = "testing1234";

    // Call the validateLogin method
    this.validateLogin(clientEmail, clientPW).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }

  validateLogin(clientEmail: string, clientPW: string): Observable<any> {
    const body = { clientEmail, clientPW };
    return this.http.post(`${this.baseUrl}/login`, body);
  }

}
