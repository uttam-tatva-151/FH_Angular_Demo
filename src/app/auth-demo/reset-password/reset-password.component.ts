import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InfoPanelComponent } from '../info-panel/info-panel.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModernCardComponent } from '../../shared/components/modern-card/modern-card.component';
import { AnimatedCirclesComponent } from '../../shared/components/animated-circles/animated-circles.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { SubmitComponent } from '../../shared/components/Buttons/submit/submit.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModernCardComponent, InfoPanelComponent, AnimatedCirclesComponent, SubmitComponent],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  showPassword = false;
  showConfirmPassword = false;
  submitted = false;
  resetPwdLoading = false;
  resetForm: FormGroup;
  passwordErrors: string[] = [];
  passwordTouched = false;
  showPasswordErrorPopup = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private passwordService: AuthService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, this.passwordStrengthValidator.bind(this)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: [this.passwordsMatchValidator]
    });
  }

  get password() {
    return this.resetForm.get('password');
  }
  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value || '';
    const errors = this.passwordService.getPasswordErrors(password);
    if (errors.length > 0) {
      // Store errors for displaying in popup
      this.passwordErrors = errors;
      return { passwordInvalid: true };
    }
    this.passwordErrors = [];
    return null;
  }

  showPasswordErrorsPopupBtn() {
    const password = this.password?.value || '';
    this.passwordErrors = this.passwordService.getPasswordErrors(password);
    this.showPasswordErrorPopup = true;
  }

  closePasswordErrorPopup() {
    this.showPasswordErrorPopup = false;
  }

  onPasswordInput() {
    const password = this.password?.value || '';
    this.passwordErrors = this.passwordService.getPasswordErrors(password);
    if (!this.passwordTouched && this.passwordErrors.length > 0) {
      this.passwordTouched = true;
      this.showPasswordErrorPopup = true;
    }
    if (this.passwordTouched && this.passwordErrors.length === 0) {
      this.passwordTouched = false;
      this.showPasswordErrorPopup = false;
    }
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const pwd = form.get('password')?.value;
    const confirmPwd = form.get('confirmPassword')?.value;
    if (pwd !== confirmPwd) {
      form.get('confirmPassword')?.setErrors({ notMatch: true });
      return { notMatch: true };
    } else {
      if (form.get('confirmPassword')?.hasError('notMatch')) {
        form.get('confirmPassword')?.setErrors(null);
      }
    }
    return null;
  }

  onSubmit() {
    // Mark all controls as touched to show errors
    this.resetForm.markAllAsTouched();

    // Re-validate password using service
    if (this.password?.invalid) {
      this.passwordErrors = this.passwordService.getPasswordErrors(this.password.value);
      if (!this.passwordTouched && this.passwordErrors.length > 0) {
        this.passwordTouched = true;
        this.showPasswordErrorPopup = true;
      }
    }

    if (this.resetForm.invalid) {
      return;
    }

    this.submitted = true;
    setTimeout(() => {
      alert('Your password has been reset! (Demo)');
      this.router.navigate(['/auth-demo/login']);
    }, 600);
  }

  toLogin() {
    this.router.navigate(['/auth-demo/login']);
  }
}