import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPanelComponent } from '../info-panel/info-panel.component'
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModernCardComponent } from '../../shared/components/modern-card/modern-card.component';
import { AnimatedCirclesComponent } from '../../shared/components/animated-circles/animated-circles.component';
import { SubmitComponent } from '../../shared/components/Buttons/submit/submit.component';
import { AuthApiService } from '../../services/auth-service/auth-api.service';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModernCardComponent,
    InfoPanelComponent,
    AnimatedCirclesComponent,
    SubmitComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;
  sendResetLinkLoading = false;

  // Add getter for form validation
  get isFormValid(): boolean {
    return this.forgotForm.valid &&
           this.email?.value &&
           this.authService.isValid(this.email.value) &&
           !this.sendResetLinkLoading;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: AuthApiService
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]]
    });
  }

  ngOnInit() {
    const email = this.authService.getEmail();
    if (email) {
      this.forgotForm.patchValue({ email });
      this.authService.clearEmail();
    }
  }

  get email() {
    return this.forgotForm.get('email');
  }

  onSubmit() {
    if (!this.isFormValid) {
      this.email?.markAsTouched();
      this.email?.setErrors({ invalidEmail: true });
      // this.toast.show({
      //   title: 'Invalid Email',
      //   message: 'Please enter a valid email address.',
      //   status: 'error',
      //   errors: ['Email is required', 'Email must be in a valid format'],
      //   progressBar: true
      // });
      return;
    }

    this.sendResetLinkLoading = true;


    this.apiService.resetPassword(JSON.stringify(this.email?.value),).subscribe({
      next: (res) => {
        this.sendResetLinkLoading = false;
        this.submitted = true;
        // this.toast.show({
        //   title: 'During Sending Email',
        //   message: res.message,
        //   status: res.status.toLowerCase(),
        //   progressBar: true
        // });
      },error: () => {
        this.sendResetLinkLoading = false;
        // this.toast.show({
        //   title: 'Error',
        //   message: 'Failed to send reset link. Please try again later.',
        //   status: 'error',
        //   progressBar: true
        // });
      }
    })
    // setTimeout(() => {
    //   this.toast.show({
    //     title: 'Email Sent',
    //     message: 'If the email exists in our system, you will receive a reset link shortly in your Inbox.',
    //     status: 'success',
    //     progressBar: true
    //   });
    //   this.sendResetLinkLoading = false;
    // }, 500);
  }

  toLogin() {
    if (this.email && this.authService.isValid(this.email.value)) {
      this.authService.setEmail(this.authService.normalize(this.email.value));
    }
    this.router.navigate(['/auth-demo/login']);
  }
}