import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth-service';
import { Router } from '@angular/router';
import { LoginDto } from '../../../core/auth/auth-model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  auth = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const data: LoginDto = {
      email: this.loginForm.get('email')!.value ?? '',
      password: this.loginForm.get('password')!.value ?? '',
    };

    this.auth.login(data).subscribe({
      next: () => {
        console.log('Login success');
        this.router.navigate(['']);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
  }
}