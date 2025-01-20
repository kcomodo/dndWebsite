import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
  
})

export class SignupComponent {
  username="";
  email="";
  password="";
  confirmPass="";
  userTos= false;
  submitted = false;
  
  constructor() {}
  
  onSubmit(): void {
    
  }
  
  
}
