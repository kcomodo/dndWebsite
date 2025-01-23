// DI for User login/signup http backend request
// Note: I didn't realize it generated with Service appended at the end so you are infact stuck with UserClientServiceService
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UserClientServiceService {
  constructor(private http: HttpClient) { }

  postData(data: any) {
    const URL = 'database-1.czkm6ku6ooe0.us-east-2.rds.amazonaws.com'
  }
}
 