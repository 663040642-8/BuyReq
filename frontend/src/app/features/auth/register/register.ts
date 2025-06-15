import { Component, inject } from '@angular/core';
import { RegisterDto } from '../../../core/auth/auth-model';
import { AuthService } from '../../../core/auth/auth-service';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const data: RegisterDto = this.registerForm.getRawValue();

    this.auth.register(data).subscribe({
      next: () => {
        console.log('Register success');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Register failed', err);
      }
    });
  }
}
