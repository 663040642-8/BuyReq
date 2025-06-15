import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth-service';
import { Router, RouterModule } from '@angular/router';
import { LoginDto } from '../../../core/auth/auth-model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const data: LoginDto = this.loginForm.getRawValue();

    this.auth.login(data).subscribe({
      next: () => {
        console.log('Login success');
        this.router.navigate(['/buy-request']);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }
}
