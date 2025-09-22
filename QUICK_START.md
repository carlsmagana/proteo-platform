# Quick Start Guide - Business Intelligence Platform

## 🚀 Inicio Rápido

### Prerrequisitos
- .NET 8 SDK
- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)

### 1. Ejecutar el Backend (.NET 8)

```bash
cd BusinessIntelligenceApi
dotnet run --urls="https://localhost:5001;http://localhost:5000"
```

**Backend estará disponible en:**
- HTTPS: https://localhost:5001
- HTTP: http://localhost:5000
- Swagger: https://localhost:5001/swagger

### 2. Ejecutar el Frontend (Angular)

```bash
cd business-intelligence-frontend
npm install  # Solo la primera vez
ng serve --port 4200
```

**Frontend estará disponible en:**
- http://localhost:4200

### 3. Acceder a la Aplicación

Abre tu navegador en http://localhost:4200 y usa estas credenciales:

**Administrador:**
- Email: admin@businessintelligence.com
- Password: admin123

**Usuario Regular:**
- Email: user@businessintelligence.com
- Password: user123

## 📋 Funcionalidades

### Dashboard Principal
- **Comercial Intelligence**: Métricas de ventas, reportes, análisis de mercado
- **R&D**: Proyectos de investigación, innovaciones, experimentos, métricas

### Módulos Disponibles

#### Comercial Intelligence
- Dashboard con métricas de ventas
- Reportes comerciales
- Análisis de competencia
- Segmentación de clientes

#### R&D (Investigación y Desarrollo)
- Gestión de proyectos de I+D
- Seguimiento de patentes e innovaciones
- Control de experimentos
- Métricas de rendimiento del equipo

## 🔧 Desarrollo

### Estructura del Proyecto
```
business-intelligence-platform/
├── BusinessIntelligenceApi/     # Backend .NET 8
├── business-intelligence-frontend/  # Frontend Angular
├── README.md
└── QUICK_START.md
```

### APIs Disponibles

**Autenticación:**
- POST /api/auth/login
- POST /api/auth/register
- GET /api/auth/me

**Comercial Intelligence:**
- GET /api/comercialintelligence/dashboard
- GET /api/comercialintelligence/reports
- GET /api/comercialintelligence/analytics

**R&D:**
- GET /api/rd/projects
- GET /api/rd/innovations
- GET /api/rd/experiments
- GET /api/rd/metrics

## 🛠️ Configuración Adicional

### Variables de Entorno (Backend)
Copia `appsettings.template.json` a `appsettings.json` y configura:
- JWT SecretKey
- Base de datos (opcional)

### Configuración del Frontend
Modifica `src/environments/environment.ts` si necesitas cambiar la URL del API.

## 📝 Notas
- El proyecto usa datos mock para demostración
- La autenticación JWT está completamente funcional
- Ambos servidores deben estar ejecutándose para el funcionamiento completo
