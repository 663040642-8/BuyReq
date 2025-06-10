import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthResponse, LoginDto, RegisterDto } from './auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient)
  #router = inject(Router);
  #apiUrl = 'http://localhost:3000/auth';

  login(data: LoginDto) {
    return this.#http.post<AuthResponse>(`${this.#apiUrl}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
      })
    );
  }

  register(data: RegisterDto) {
    return this.#http.post<AuthResponse>(`${this.#apiUrl}/register`, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.#router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
