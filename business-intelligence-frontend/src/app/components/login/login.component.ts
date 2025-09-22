import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 login-background">
      <div class="max-w-md w-full space-y-8">
        <div>
          <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <i class="fas fa-chart-line text-blue-600 text-xl"></i>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Business Intelligence Platform
          </h2>
          <p class="mt-1 text-center text-xs text-gray-500 font-medium">
            Powered by X-WORLD
          </p>
          <p class="mt-2 text-center text-sm text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                [(ngModel)]="credentials.email"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Dirección de email"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                [(ngModel)]="credentials.password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div *ngIf="errorMessage" class="text-red-600 text-sm text-center">
            {{ errorMessage }}
          </div>

          <div>
            <button
              type="submit"
              [disabled]="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <span *ngIf="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
              {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              ¿No tienes una cuenta?
              <a routerLink="/register" class="font-medium text-blue-600 hover:text-blue-500">
                Regístrate aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-background {
      background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/cover-home.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    
    .max-w-md {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
    }
    
    .bg-blue-100 {
      background-color: rgba(219, 234, 254, 0.8);
    }
    
    .text-gray-900 {
      color: #ffffff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
      font-weight: 700;
    }
    
    .text-gray-600 {
      color: #f3f4f6;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    }
    
    .text-gray-500 {
      color: #e5e7eb;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
    }
    
    .text-gray-700 {
      color: #000000;
      text-shadow: none;
      font-weight: 500;
    }
    
    label {
      color: #000000 !important;
      text-shadow: none !important;
      font-weight: 500;
    }
    
    .form-input {
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    input::placeholder {
      color: #000000 !important;
      opacity: 1;
      text-shadow: none !important;
    }
    
    .placeholder-gray-500::placeholder {
      color: #000000 !important;
      opacity: 1;
      text-shadow: none !important;
    }
    
    input {
      color: #000000 !important;
      text-shadow: none !important;
    }
    
    .text-gray-900 {
      color: #000000 !important;
      text-shadow: none !important;
    }
    
    .btn-primary {
      background: rgba(37, 99, 235, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `]
})
export class LoginComponent {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };
  
  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Email o contraseña incorrectos';
        console.error('Login error:', error);
      }
    });
  }
}
