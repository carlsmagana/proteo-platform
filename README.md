# 📊 Business Intelligence Platform

Una aplicación web moderna de Business Intelligence construida con **Angular 19** para el frontend y **.NET 8** para el backend. Plataforma completa con autenticación JWT, dashboard interactivo y módulos especializados para análisis comercial e investigación y desarrollo.

![Angular](https://img.shields.io/badge/Angular-19-red?style=flat-square&logo=angular)
![.NET](https://img.shields.io/badge/.NET-8-purple?style=flat-square&logo=dotnet)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![C#](https://img.shields.io/badge/C%23-12-green?style=flat-square&logo=csharp)

## 🚀 Características

- **Sistema de Autenticación**: Login seguro con JWT tokens
- **Dashboard Principal**: Interfaz intuitiva con menú lateral
- **Comercial Intelligence**: Análisis de ventas, métricas de clientes y análisis de mercado
- **R&D (Investigación y Desarrollo)**: Gestión de proyectos, innovaciones y experimentos
- **Arquitectura Moderna**: Angular 19 + .NET 8 + JWT Authentication

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- .NET 8 SDK
- Angular CLI (`npm install -g @angular/cli`)

## 🛠️ Instalación y Configuración

### Backend (.NET 8 Web API)

1. Navegar al directorio del backend:
```bash
cd BusinessIntelligenceApi
```

2. Restaurar dependencias:
```bash
dotnet restore
```

3. Ejecutar la aplicación:
```bash
dotnet run
```

El backend estará disponible en: `https://localhost:5001` o `http://localhost:5000`

### Frontend (Angular)

1. Navegar al directorio del frontend:
```bash
cd business-intelligence-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar la aplicación:
```bash
ng serve
```

El frontend estará disponible en: `http://localhost:4200`

## 🔐 Usuarios de Prueba

Para probar la aplicación, puedes usar las siguientes credenciales:

**Administrador:**
- Email: `admin@businessintelligence.com`
- Password: `admin123`

**Usuario Regular:**
- Email: `user@businessintelligence.com`
- Password: `user123`

## 📁 Estructura del Proyecto

```
business-intelligence-platform/
├── BusinessIntelligenceApi/          # Backend .NET 8 Web API
│   ├── Controllers/                  # Controladores de API
│   ├── Models/                       # Modelos de datos
│   ├── Services/                     # Servicios de negocio
│   ├── DTOs/                         # Data Transfer Objects
│   └── Program.cs                    # Configuración principal
├── business-intelligence-frontend/   # Frontend Angular
│   ├── src/
│   │   ├── app/                      # Componentes de la aplicación
│   │   ├── assets/                   # Recursos estáticos
│   │   └── environments/             # Configuraciones de entorno
└── README.md                         # Este archivo
```

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `GET /api/auth/me` - Obtener usuario actual

### Comercial Intelligence
- `GET /api/comercialintelligence/dashboard` - Dashboard de ventas
- `GET /api/comercialintelligence/reports` - Reportes comerciales
- `GET /api/comercialintelligence/analytics` - Análisis comercial

### R&D (Investigación y Desarrollo)
- `GET /api/rd/projects` - Proyectos de I+D
- `GET /api/rd/innovations` - Innovaciones y patentes
- `GET /api/rd/experiments` - Experimentos activos
- `GET /api/rd/metrics` - Métricas de I+D

## 🎨 Tecnologías Utilizadas

### Backend
- .NET 8
- ASP.NET Core Web API
- JWT Authentication
- BCrypt para hashing de contraseñas
- Swagger/OpenAPI para documentación

### Frontend
- Angular 19
- TypeScript
- SCSS
- Standalone Components
- Angular Router

## 🔒 Seguridad

- Autenticación basada en JWT tokens
- Contraseñas hasheadas con BCrypt
- CORS configurado para el frontend
- Guards de autenticación en rutas protegidas

## 🚀 Próximas Características

- [ ] Base de datos persistente (SQL Server/PostgreSQL)
- [ ] Roles y permisos avanzados
- [ ] Dashboard con gráficos interactivos
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Notificaciones en tiempo real
- [ ] API de integración con sistemas externos

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas, por favor crea un issue en el repositorio del proyecto.
