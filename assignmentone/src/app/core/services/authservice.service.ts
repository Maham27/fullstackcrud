import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:3000/api/registration';
  private loginapiurl = 'http://localhost:3000/api/login'

  constructor(private http: HttpClient) { }
  createuser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  loginuser(user: any): Observable<any> {
    return this.http.post<any>(this.loginapiurl, user);
  }
}
