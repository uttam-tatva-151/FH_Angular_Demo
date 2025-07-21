import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TogglePassword } from '../../directives/toggle-password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule, MatIconModule, TogglePassword],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
      remmemberMe: [false]
    })
  }

  onSubmit(): void{
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.fakeLoginApi(email, password).subscribe({
      next: (res) => {
        console.log('Login success:', res);
        this.loginForm.get('email')?.setErrors(null);
      },
      error: (err) => {
        if (err === 'EMAIL_NOT_FOUND') {
          this.loginForm.get('email')?.setErrors({ notFound: true });
          this.loginForm.get('email')?.markAsTouched();
        }
      }
    });
  }

  fakeLoginApi(email: string, password: string): Observable<any> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (email !== 'user@example.com') {
          observer.error('EMAIL_NOT_FOUND');
        } else if (password !== '123456') {
          observer.error('INVALID_PASSWORD');
        } else {
          observer.next({ token: 'abc123' });
          observer.complete();
        }
      }, 1000);
    });
  }

}
