import { Component, inject } from '@angular/core';
import { RegisterDto } from '../../../core/auth/auth-model';
import { AuthService } from '../../../core/auth/auth-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  auth = inject(AuthService);
  router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const data: RegisterDto = {
      email: this.registerForm.get('email')!.value ?? '',
      password: this.registerForm.get('password')!.value ?? '',
      firstName: this.registerForm.get('firstName')!.value ?? '',
      lastName: this.registerForm.get('lastName')!.value ?? '',
    };

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
