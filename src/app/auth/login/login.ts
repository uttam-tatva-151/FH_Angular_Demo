import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TogglePassword } from '../../directives/toggle-password';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service/login-service';
import { ToasterService } from '@coreui/angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    RouterLink,
    TogglePassword,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit(): void {
    debugger
    if (this.loginForm.invalid) return;

    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.toastr.success('Login successful!');
          this.router.navigate(['/dashboard']);
        } else {
          this.toastr.error(res.message || 'Login failed. Please try again.');
        }
      },
      error: (err) => {
        const msg = err.error?.message || 'Something went wrong';
        this.toastr.error(msg);
      }
    });
  }
}
