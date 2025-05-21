import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <div class="nav-content">
          <a routerLink="/"  class="logo">AstroNet</a>
      </div>
    </nav>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .navbar {
      background-color: #2c3e50;
      padding: 1rem;
      color: white;
    }
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: left;
    }
    .nav-links {
      list-style: none;
      display: flex;
      gap: 1rem;
    }
    
  `]
})
export class AppComponent {}
