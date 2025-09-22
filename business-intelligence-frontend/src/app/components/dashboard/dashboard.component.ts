import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="custom-header shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <i class="fas fa-chart-line text-blue-600 text-2xl"></i>
              </div>
              <div class="ml-4">
                <h1 class="text-xl font-semibold text-gray-900">Business Intelligence Platform</h1>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <div class="text-sm text-gray-700">
                Welcome, <span class="font-medium">{{ currentUser?.username }}</span>
              </div>
              <button
                (click)="logout()"
                class="logout-button inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <i class="fas fa-sign-out-alt mr-2"></i>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="flex">
        <!-- Sidebar -->
        <nav class="bg-white w-64 min-h-screen shadow-sm border-r border-gray-200">
          <div class="p-4">
            <div class="space-y-1">
              <a
                routerLink="/dashboard/comercial-intelligence"
                routerLinkActive="active"
                class="sidebar-item"
              >
                <i class="fas fa-chart-bar w-5 h-5 mr-3"></i>
                <span>Commercial Intelligence</span>
              </a>
              <a
                routerLink="/dashboard/rd"
                routerLinkActive="active"
                class="sidebar-item"
              >
                <i class="fas fa-flask w-5 h-5 mr-3"></i>
                <span>R&D</span>
              </a>
            </div>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="flex-1 p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .custom-header {
      background-color: rgb(0, 169, 221);
    }
    
    .custom-header h1 {
      color: white !important;
    }
    
    .custom-header .text-gray-700 {
      color: white !important;
    }
    
    .custom-header .text-gray-900 {
      color: white !important;
    }
    
    .custom-header .font-medium {
      color: white !important;
    }
    
    .custom-header i {
      color: white !important;
    }
    
    .logout-button {
      background-color: rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      transition: all 0.2s ease;
    }
    
    .logout-button:hover {
      background-color: rgba(255, 255, 255, 0.3) !important;
      color: white !important;
    }
    
    .logout-button i {
      color: white !important;
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
