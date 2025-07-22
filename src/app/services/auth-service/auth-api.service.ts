import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl = `http://localhost:5253/api/Auth`;
  constructor(private http: HttpClient) {}

  sendResetPasswordEmail(
    email: string,
    username: string
  ): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(`${this.baseUrl}/forgot-password`, {
      params: {
        email,
        username,
      },
    });
  }
  registerUser(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/register`, request, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Authentication/login`, credentials, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  updatePassword(request: any): Observable<any>{
    return this.http.post(`${this.baseUrl}/Authentication/update-password`, request, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  resetPassword(request: string): Observable<any>{
    return this.http.post(`${this.baseUrl}/Authentication/reset-password-link`, request, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
