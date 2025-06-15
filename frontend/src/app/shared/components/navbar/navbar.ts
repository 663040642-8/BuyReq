import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private auth = inject(AuthService);
  menuOpen = signal(false);

  user = computed(() => this.auth.currentUser());
  isLoggedIn = computed(() => this.auth.isLoggedIn());

  logout() {
    this.auth.logout();
  }

  onSearch() {

  }

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }
}
