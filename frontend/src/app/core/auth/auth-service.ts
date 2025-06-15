import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthResponse, LoginDto, RegisterDto } from './auth-model';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);
  #apiUrl = 'http://localhost:3000/auth';
  #user = signal<User | null>(null);
  #token = signal<string | null>(null);

  constructor() {
    this.restoreSession(); // เรียกตอนสร้าง service เพื่อ restore session จาก localStorage
  }

  login(loginDto: LoginDto) {
    return this.#http.post<AuthResponse>(`${this.#apiUrl}/login`, loginDto).pipe(
      tap((res) => {
        this.#token.set(res.access_token);
        this.#user.set(res.user);

        // save ลง localStorage
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  register(registerDto: RegisterDto) {
    return this.#http.post<AuthResponse>(`${this.#apiUrl}/register`, registerDto);
  }

  getToken() {
    return this.#token();
  }

  logout() {
    this.#token.set(null);
    this.#user.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.#router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.#token();
  }

  currentUser = computed(() => this.#user());

  restoreSession() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.#token.set(token);
      this.#user.set(JSON.parse(user));
    }
  }
}
