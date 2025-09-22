import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'comercial-intelligence',
        pathMatch: 'full'
      },
      {
        path: 'comercial-intelligence',
        loadComponent: () => import('./components/comercial-intelligence/comercial-intelligence.component').then(m => m.ComercialIntelligenceComponent)
      },
      {
        path: 'rd',
        loadComponent: () => import('./components/rd/rd.component').then(m => m.RDComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
