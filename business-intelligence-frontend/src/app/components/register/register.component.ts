import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 register-background">
      <div class="max-w-md w-full space-y-8">
        <div>
          <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <i class="fas fa-user-plus text-blue-600 text-xl"></i>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Nueva Cuenta
          </h2>
          <p class="mt-1 text-center text-xs text-gray-500 font-medium">
            Powered by X-WORLD
          </p>
          <p class="mt-2 text-center text-sm text-gray-600">
            Únete a Business Intelligence Platform
          </p>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                [(ngModel)]="userData.username"
                class="form-input"
                placeholder="Tu nombre de usuario"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                [(ngModel)]="userData.email"
                class="form-input"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                [(ngModel)]="userData.password"
                class="form-input"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                [(ngModel)]="userData.confirmPassword"
                class="form-input"
                placeholder="Repite tu contraseña"
              />
            </div>
          </div>

          <div *ngIf="errorMessage" class="text-red-600 text-sm text-center">
            {{ errorMessage }}
          </div>

          <div *ngIf="successMessage" class="text-green-600 text-sm text-center">
            {{ successMessage }}
          </div>

          <div>
            <button
              type="submit"
              [disabled]="isLoading"
              class="btn-primary w-full"
            >
              <span *ngIf="isLoading" class="mr-2">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
              {{ isLoading ? 'Registrando...' : 'Crear Cuenta' }}
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-gray-600">
              ¿Ya tienes una cuenta?
              <a routerLink="/login" class="font-medium text-blue-600 hover:text-blue-500">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .register-background {
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
export class RegisterComponent {
  userData: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    // Validaciones
    if (!this.userData.username || !this.userData.email || !this.userData.password || !this.userData.confirmPassword) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (this.userData.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Cuenta creada exitosamente. Redirigiendo al login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Error al crear la cuenta';
        console.error('Register error:', error);
      }
    });
  }
}
