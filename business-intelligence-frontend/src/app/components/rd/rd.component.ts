import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RDService } from '../../services/rd.service';
import { RDProject, Innovations, Experiment, RDMetrics } from '../../models/rd.model';

@Component({
  selector: 'app-rd',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-900">Research & Development</h2>
        <div class="flex space-x-2">
          <button
            (click)="activeTab = 'projects'"
            [class]="activeTab === 'projects' ? 'btn-primary' : 'btn-secondary'"
          >
            Projects
          </button>
          <button
            (click)="activeTab = 'innovations'"
            [class]="activeTab === 'innovations' ? 'btn-primary' : 'btn-secondary'"
          >
            Innovations
          </button>
          <button
            (click)="activeTab = 'experiments'"
            [class]="activeTab === 'experiments' ? 'btn-primary' : 'btn-secondary'"
          >
            Experiments
          </button>
          <button
            (click)="activeTab = 'metrics'"
            [class]="activeTab === 'metrics' ? 'btn-primary' : 'btn-secondary'"
          >
            Metrics
          </button>
        </div>
      </div>

      <!-- Projects Tab -->
      <div *ngIf="activeTab === 'projects' && projects" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let project of projects" class="card">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
              <span 
                [class]="getStatusClass(project.status)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ project.status }}
              </span>
            </div>
            <div class="space-y-3">
              <div>
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>{{ project.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    [style.width.%]="project.progress"
                  ></div>
                </div>
              </div>
              <div class="text-sm text-gray-600">
                <p><strong>Equipo:</strong> {{ project.team }}</p>
                <p><strong>Inicio:</strong> {{ project.startDate | date:'short' }}</p>
                <p><strong>Estimado:</strong> {{ project.estimatedCompletion | date:'short' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Innovations Tab -->
      <div *ngIf="activeTab === 'innovations' && innovations" class="space-y-6">
        <!-- Patents Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card text-center">
            <div class="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i class="fas fa-certificate text-green-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">{{ innovations.patents.approved }}</h3>
            <p class="text-gray-600">Patentes Aprobadas</p>
          </div>
          <div class="card text-center">
            <div class="p-3 bg-yellow-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i class="fas fa-clock text-yellow-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">{{ innovations.patents.pending }}</h3>
            <p class="text-gray-600">Patentes Pendientes</p>
          </div>
          <div class="card text-center">
            <div class="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i class="fas fa-file-alt text-blue-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">{{ innovations.patents.filed }}</h3>
            <p class="text-gray-600">Total Presentadas</p>
          </div>
        </div>

        <!-- Research Areas -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Áreas de Investigación</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presupuesto</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investigadores</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr *ngFor="let area of innovations.researchAreas">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ area.area }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ area.budget | currency:'USD':'symbol':'1.0-0' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ area.researchers }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Publications -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Publicaciones Recientes</h3>
          <div class="space-y-4">
            <div *ngFor="let publication of innovations.publications" class="border-l-4 border-blue-500 pl-4">
              <h4 class="font-medium text-gray-900">{{ publication.title }}</h4>
              <p class="text-sm text-gray-600">{{ publication.journal }} • {{ publication.date | date:'short' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Experiments Tab -->
      <div *ngIf="activeTab === 'experiments' && experiments" class="space-y-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div *ngFor="let experiment of experiments" class="card">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ experiment.name }}</h3>
              <span 
                [class]="getStatusClass(experiment.status)"
                class="px-2 py-1 text-xs font-medium rounded-full"
              >
                {{ experiment.status }}
              </span>
            </div>
            <div class="space-y-3">
              <div>
                <h4 class="font-medium text-gray-700">Hipótesis:</h4>
                <p class="text-sm text-gray-600">{{ experiment.hypothesis }}</p>
              </div>
              <div>
                <h4 class="font-medium text-gray-700">Resultados:</h4>
                <p class="text-sm text-gray-600">{{ experiment.results }}</p>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span><strong>Investigador:</strong> {{ experiment.researcher }}</span>
                <span><strong>Inicio:</strong> {{ experiment.startDate | date:'short' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Metrics Tab -->
      <div *ngIf="activeTab === 'metrics' && metrics" class="space-y-6">
        <!-- Budget Utilization -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Utilización del Presupuesto</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ metrics.budgetUtilization.totalBudget | currency:'USD':'symbol':'1.0-0' }}</div>
              <div class="text-sm text-gray-600">Presupuesto Total</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ metrics.budgetUtilization.utilized | currency:'USD':'symbol':'1.0-0' }}</div>
              <div class="text-sm text-gray-600">Utilizado</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-600">{{ metrics.budgetUtilization.remaining | currency:'USD':'symbol':'1.0-0' }}</div>
              <div class="text-sm text-gray-600">Restante</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ metrics.budgetUtilization.utilizationRate }}%</div>
              <div class="text-sm text-gray-600">Tasa de Utilización</div>
            </div>
          </div>
        </div>

        <!-- Team Performance -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Rendimiento del Equipo</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-700">Total Investigadores</span>
                <span class="font-medium">{{ metrics.teamPerformance.totalResearchers }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Proyectos Activos</span>
                <span class="font-medium">{{ metrics.teamPerformance.activeProjects }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Proyectos Completados</span>
                <span class="font-medium">{{ metrics.teamPerformance.completedProjects }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">Tasa de Éxito</span>
                <span class="font-medium text-green-600">{{ metrics.teamPerformance.successRate }}%</span>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Índice de Innovación</h3>
            <div class="text-center mb-4">
              <div class="text-4xl font-bold text-blue-600">{{ metrics.innovationIndex.score }}/10</div>
              <div class="text-sm text-gray-600">{{ metrics.innovationIndex.ranking }}</div>
            </div>
            <div>
              <h4 class="font-medium text-gray-700 mb-2">Áreas de Mejora:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li *ngFor="let area of metrics.innovationIndex.improvementAreas" class="flex items-center">
                  <i class="fas fa-arrow-right text-blue-500 mr-2"></i>
                  {{ area }}
                </li>
              </ul>
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
export class RDComponent implements OnInit {
  activeTab: 'projects' | 'innovations' | 'experiments' | 'metrics' = 'projects';
  projects: RDProject[] | null = null;
  innovations: Innovations | null = null;
  experiments: Experiment[] | null = null;
  metrics: RDMetrics | null = null;
  isLoading = false;

  constructor(private rdService: RDService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    this.rdService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading = false;
      }
    });

    this.rdService.getInnovations().subscribe({
      next: (data) => {
        this.innovations = data;
      },
      error: (error) => {
        console.error('Error loading innovations:', error);
      }
    });

    this.rdService.getExperiments().subscribe({
      next: (data) => {
        this.experiments = data;
      },
      error: (error) => {
        console.error('Error loading experiments:', error);
      }
    });

    this.rdService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
      },
      error: (error) => {
        console.error('Error loading metrics:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'en progreso':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
      case 'planificación':
        return 'bg-yellow-100 text-yellow-800';
      case 'testing':
      case 'pruebas':
        return 'bg-purple-100 text-purple-800';
      case 'active':
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'research phase':
      case 'fase de investigación':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}
