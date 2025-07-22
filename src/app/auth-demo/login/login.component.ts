import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfoPanelComponent } from '../info-panel/info-panel.component';
import { ModernCardComponent } from '../../shared/components/modern-card/modern-card.component';
import { AuthApiService } from '../../services/auth-service/auth-api.service';
import { AuthService } from '../../services/auth-service/auth.service';
import { AnimatedCirclesComponent } from '../../shared/components/animated-circles/animated-circles.component';
import { SubmitComponent } from '../../shared/components/Buttons/submit/submit.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModernCardComponent, InfoPanelComponent, AnimatedCirclesComponent, SubmitComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm: FormGroup;
  loginLoading = false;
  circlesConfig = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiSerivce: AuthApiService,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    const savedEmail = this.authService.getEmail();
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail });
      this.authService.clearEmail();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    // Custom validation using services
    if (!this.authService.isValid(this.email?.value)) {
      this.email?.setErrors({ invalidEmail: true });
    }
    if (!this.authService.isValid(this.password?.value)) {
      this.password?.setErrors({ invalidPassword: true });
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
   const user = {
    email: this.email?.value,
    password: this.password?.value,
    isRememberMe: this.rememberMe?.value
   };

   this.loginLoading = true;
   this.apiSerivce.login(user).subscribe({
    next: (responce) => {
      this.loginLoading = false;
      // this.toast.show({
      //   title: 'During Login Process',
      //   message: responce.message,
      //   status: responce.status.toLowerCase(),
      //   progressBar: true
      // });
    },error: () => {
      this.loginLoading = false;
      // this.toast.show({
      //   title: 'Error',
      //   message: 'Failed to Login User. Please try again later.',
      //   status: 'error',
      //   progressBar: true
      // });
    }
   })
  }

  toForgotPassword() {
    if (this.email && this.authService.isValid(this.email.value)) {
      this.authService.setEmail(this.authService.normalize(this.email.value));
    } else {
      this.authService.clearEmail();
    }
    this.router.navigate(['/auth-demo/forgot-password']);
  }

  toRegister() {
    this.router.navigate(['/auth-demo/register']);
  }
}