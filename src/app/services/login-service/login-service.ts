import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../models/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUri = `http://localhost:5253/api/Auth`;

  constructor(private http: HttpClient) {}

  login(data: { userName: string; password: string; rememberMe: boolean }): Observable<ResponseModel> {
    debugger
    return this.http.post<ResponseModel>(`${this.apiUri}/login`, data, {
      withCredentials: true,
    });
  }
}
