import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComercialIntelligenceService } from '../../services/comercial-intelligence.service';
import { ComercialDashboard, Report, Analytics } from '../../models/comercial-intelligence.model';

@Component({
  selector: 'app-comercial-intelligence',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Commercial Intelligence</h2>
        <div class="flex space-x-2">
          <button
            (click)="activeTab = 'dashboard'"
            [class]="activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'"
          >
            Dashboard
          </button>
          <button
            (click)="activeTab = 'reports'"
            [class]="activeTab === 'reports' ? 'btn-primary' : 'btn-secondary'"
          >
            Reports
          </button>
          <button
            (click)="activeTab = 'analytics'"
            [class]="activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'"
          >
            Analytics
          </button>
        </div>
      </div>

      <!-- Dashboard Tab -->
      <div *ngIf="activeTab === 'dashboard' && dashboardData" class="space-y-6">
        <!-- Sales Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <i class="fas fa-dollar-sign text-green-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Ventas Totales</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData.salesMetrics.totalSales | currency:'USD':'symbol':'1.0-0' }}</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <i class="fas fa-chart-line text-blue-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Crecimiento Mensual</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData.salesMetrics.monthlyGrowth }}%</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <i class="fas fa-users text-purple-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Clientes</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData.customerMetrics.totalCustomers | number }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Products -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Productos Top</h3>
          <div class="space-y-3">
            <div *ngFor="let product of dashboardData.salesMetrics.topProducts" class="flex justify-between items-center">
              <span class="text-gray-700">{{ product.name }}</span>
              <span class="font-semibold text-gray-900">{{ product.sales | currency:'USD':'symbol':'1.0-0' }}</span>
            </div>
          </div>
        </div>

        <!-- Market Analysis -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Participación de Mercado</h3>
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600">{{ dashboardData.marketAnalysis.marketShare }}%</div>
              <p class="text-gray-600">Nuestra participación</p>
            </div>
          </div>
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Análisis de Competencia</h3>
            <div class="space-y-2">
              <div *ngFor="let competitor of dashboardData.marketAnalysis.competitorAnalysis" class="flex justify-between">
                <span class="text-gray-700">{{ competitor.competitor }}</span>
                <span class="font-medium">{{ competitor.marketShare }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reports Tab -->
      <div *ngIf="activeTab === 'reports' && reports" class="space-y-4">
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Reportes Disponibles</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let report of reports">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ report.title }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ report.type }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ report.date | date:'short' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900">Ver</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Analytics Tab -->
      <div *ngIf="activeTab === 'analytics' && analyticsData" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Sales Trends -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Tendencias de Ventas</h3>
            <div class="space-y-2">
              <div *ngFor="let trend of analyticsData.salesTrends" class="flex justify-between">
                <span class="text-gray-700">{{ trend.month }}</span>
                <span class="font-medium">{{ trend.sales | currency:'USD':'symbol':'1.0-0' }}</span>
              </div>
            </div>
          </div>

          <!-- Customer Segmentation -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Segmentación de Clientes</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-700">Enterprise</span>
                <span class="font-medium">{{ analyticsData.customerSegmentation.enterprise }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Mid Market</span>
                <span class="font-medium">{{ analyticsData.customerSegmentation.midMarket }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Small Business</span>
                <span class="font-medium">{{ analyticsData.customerSegmentation.smallBusiness }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Revenue by Region -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Ingresos por Región</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div *ngFor="let region of analyticsData.revenueByRegion" class="text-center p-4 bg-gray-50 rounded-lg">
              <div class="text-lg font-semibold text-gray-900">{{ region.region }}</div>
              <div class="text-xl font-bold text-blue-600">{{ region.revenue | currency:'USD':'symbol':'1.0-0' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div *ngIf="isLoading" class="flex justify-center items-center h-64">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-3xl text-blue-600 mb-4"></i>
          <p class="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ComercialIntelligenceComponent implements OnInit {
  activeTab: 'dashboard' | 'reports' | 'analytics' = 'dashboard';
  dashboardData: ComercialDashboard | null = null;
  reports: Report[] | null = null;
  analyticsData: Analytics | null = null;
  isLoading = false;

  constructor(private comercialIntelligenceService: ComercialIntelligenceService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    this.comercialIntelligenceService.getDashboard().subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });

    this.comercialIntelligenceService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (error) => {
        console.error('Error loading reports:', error);
      }
    });

    this.comercialIntelligenceService.getAnalytics().subscribe({
      next: (data) => {
        this.analyticsData = data;
      },
      error: (error) => {
        console.error('Error loading analytics:', error);
      }
    });
  }
}
