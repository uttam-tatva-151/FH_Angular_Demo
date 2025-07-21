
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomInput } from '../../shared/components/custom-input/custom-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoleOptions } from '../../shared/constants/select-options.constant.js'

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CustomInput, RouterLink, MatFormFieldModule, MatInputModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  signUpForm!: FormGroup;
  roles = RoleOptions;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      userName: ['', [Validators.required,Validators.minLength(3)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }



  onSubmit(): void {
    if (this.signUpForm.invalid) return;
    const { userName, firstName, lastName, role } = this.signUpForm.value;
    console.log('Sign Up Data:', { userName, firstName, lastName, role });
  }

  get userNameControl(): FormControl {
    return this.signUpForm.get('userName') as FormControl;
  }
  get firstNameControl(): FormControl {
    return this.signUpForm.get('firstName') as FormControl;
  }
  get lastNameControl(): FormControl {
    return this.signUpForm.get('lastName') as FormControl;
  }
  get roleControl(): FormControl {
    return this.signUpForm.get('role') as FormControl;
  }

}
