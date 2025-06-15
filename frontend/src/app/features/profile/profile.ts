import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  http = inject(HttpClient);

  user = signal<User | null>(null);
  loading = signal(true);

  apiUrl = 'http://localhost:3000/users/me';

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.http.get<User>(this.apiUrl).subscribe({
      next: (data) => this.user.set(data),
      error: (err) => console.error('Get request failed', err),
      complete: () => this.loading.set(false)
    });
  }

  fullName = computed(() =>
    this.user() ? `${this.user()!.firstName} ${this.user()!.lastName}` : ''
  );

  formattedCreatedAt = computed(() =>
    this.user() ? new Date(this.user()!.createdAt).toLocaleDateString() : ''
  );

  formattedUpdatedAt = computed(() =>
    this.user() ? new Date(this.user()!.updatedAt).toLocaleDateString() : ''
  );
}
