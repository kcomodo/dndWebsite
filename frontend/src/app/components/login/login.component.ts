import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { CustomerService } from '../../services/customer.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule], //Import formsModule for Ng
  templateUrl: './login.component.html', // Correctly referring to the HTML file
  styleUrls: ['./login.component.css'], // Correctly pluralized
})
export class LoginComponent {
  clientEmail: string = "";
  clientPW: string = "";
  constructor(private router: Router, private customerService : CustomerService) { 
    console.log("Testing LoginComponent");
  }
  onLogin(): void {
    console.log("email and password: ", this.clientEmail, this.clientPW);

    // Call the validateLogin method in customerService
    this.customerService.validateLogin(this.clientEmail, this.clientPW).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }


}
