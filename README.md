# 🚛 Sistema de Gestión de Repartos

Sistema completo de gestión de clientes, camiones y repartos desarrollado con **Astro 5.15.3** y **JavaScript puro**. Diseñado como una **PWA (Progressive Web App)** con arquitectura escalable y organizada por dominios.

## 🚀 Características Principales

- ✅ **PWA Completa** - Instalable, offline-ready, service worker
- ✅ **Responsive Design** - Optimizado para móviles y desktop
- ✅ **Autenticación JWT** - Sistema seguro de login/logout
- ✅ **Dashboard Interactivo** - KPIs, gráficos y estadísticas en tiempo real
- ✅ **Gestión de Clientes** - CRUD completo con búsqueda avanzada
- ✅ **Gestión de Camiones** - Control de flota y estados
- ✅ **Sistema de Repartos** - Planificación y seguimiento de entregas
- ✅ **Mapa Interactivo** - Visualización de rutas y ubicaciones
- ✅ **Base de Datos PostgreSQL** - Con pooling de conexiones
- ✅ **API REST** - Endpoints organizados y documentados

## 📁 Estructura del Proyecto

```
📦 Sistema de Repartos
├── 🌐 public/                    # Archivos estáticos
│   ├── icons/                    # Iconos PWA (SVG)
│   ├── manifest.json             # Manifiesto PWA
│   ├── sw.js                     # Service Worker
│   └── offline.html              # Página offline
├── 📂 src/
│   ├── 🎯 caracteristicas/       # Organización por dominio
│   │   ├── 🔐 autenticacion/
│   │   │   └── servicios/
│   │   │       └── autenticacionApi.js
│   │   ├── 👥 clientes/
│   │   │   └── servicios/
│   │   │       └── clientesApi.js
│   │   ├── 🚛 camiones/
│   │   │   └── servicios/
│   │   │       └── camionesApi.js
│   │   └── 📦 repartos/
│   │       └── servicios/
│   │           └── repartosApi.js
│   ├── 🧩 componentes/           # Componentes en español
│   │   ├── comunes/              # Componentes básicos reutilizables
│   │   │   ├── CargandoEsqueleto.astro
│   │   │   ├── CargandoGirador.astro
│   │   │   ├── Movimiento.astro
│   │   │   └── MovimientoSimple.astro
│   │   ├── formularios/          # Formularios inteligentes
│   │   │   ├── EntradaInteligente.astro
│   │   │   ├── FormularioInteligente.astro
│   │   │   └── SelectorInteligente.astro
│   │   ├── interfaz/             # Componentes UI avanzados
│   │   │   ├── InteractiveButton.astro
│   │   │   ├── InteractiveCard.astro
│   │   │   ├── MicroAnimations.astro
│   │   │   ├── PullToRefresh.astro
│   │   │   ├── ResponsiveSearch.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── layout/               # Navegación y estructura
│   │   │   └── Navegacion.astro
│   │   └── modales/              # Modales y overlays
│   │       └── DetalleCliente.astro
│   ├── 🔧 components/            # Widgets especializados
│   │   ├── notifications/        # Sistema de notificaciones
│   │   │   └── ToastContainer.astro
│   │   └── widgets/             # Widgets de dashboard
│   │       ├── ChartWidget.astro
│   │       ├── KPIWidget.astro
│   │       └── NotificationBell.astro
│   ├── 🎨 estilos/               # Estilos globales
│   │   └── global.css
│   ├── 📄 layouts/               # Plantillas de página
│   │   └── Layout.astro
│   ├── 🛠️ lib/                   # Utilidades centralizadas
│   │   ├── base-datos/          # Conexión a base de datos
│   │   │   └── conexion.js
│   │   ├── constantes/          # Configuración del sistema
│   │   │   └── sistema.js
│   │   ├── utilidades/          # Helpers y validaciones
│   │   │   ├── autenticacion.js
│   │   │   ├── formato.js
│   │   │   └── validacion.js
│   │   └── auth.js              # (Legacy - migrar a utilidades/)
│   └── 📄 pages/                # Páginas y API endpoints
│       ├── index.astro          # Página de inicio/redirección
│       ├── login.astro          # Página de autenticación
│       ├── dashboard.astro      # Panel principal
│       ├── clientes.astro       # Gestión de clientes
│       ├── camiones.astro       # Gestión de camiones
│       ├── repartos.astro       # Gestión de repartos
│       ├── mapa.astro          # Mapa interactivo
│       └── api/                # API REST endpoints
│           ├── auth/           # Autenticación
│           │   ├── check.js
│           │   ├── login.js
│           │   └── logout.js
│           ├── clientes/       # CRUD clientes
│           │   ├── index.js
│           │   └── [id].js
│           ├── camiones/       # CRUD camiones
│           │   ├── index.js
│           │   └── [id].js
│           ├── repartos/       # CRUD repartos
│           │   ├── index.js
│           │   └── [id].js
│           ├── rutas/         # Gestión de rutas
│           │   └── index.js
│           └── dashboard/     # Estadísticas
│               └── stats.js
├── 📋 Archivos de configuración
│   ├── astro.config.mjs       # Configuración de Astro
│   ├── package.json           # Dependencias del proyecto
│   ├── tsconfig.json          # Configuración TypeScript
│   ├── tailwind.config.js     # Configuración de Tailwind
│   └── netlify.toml          # Configuración de despliegue
└── 📚 Documentación
    ├── README.md              # Este archivo
    ├── RESPONSIVE_IMPLEMENTATION.md
    ├── IMPLEMENTACION_FASE_2.1.md
    └── ROADMAP_MEJORAS.md
```

## 🏗️ Arquitectura del Sistema

### **🎯 Organización por Dominios (`src/caracteristicas/`)**

Cada funcionalidad principal del sistema tiene su propio dominio:

- **`autenticacion/`** - Gestión de usuarios y sesiones
- **`clientes/`** - Operaciones CRUD de clientes
- **`camiones/`** - Gestión de flota vehicular
- **`repartos/`** - Planificación y seguimiento de entregas

Cada dominio contiene:
- `servicios/` - Clases API para comunicación con endpoints

### **🧩 Componentes (`src/componentes/`)**

Estructura organizada en español para mejor comprensión:

- **`comunes/`** - Componentes base reutilizables (loading, animaciones)
- **`formularios/`** - Formularios inteligentes con validación
- **`interfaz/`** - Componentes UI avanzados (botones, cards, search)
- **`layout/`** - Estructura de navegación y layout
- **`modales/`** - Ventanas modales y overlays

### **🛠️ Utilidades (`src/lib/`)**

- **`base-datos/`** - Conexión PostgreSQL con pooling
- **`constantes/`** - Configuración centralizada del sistema
- **`utilidades/`** - Helpers para formato, validación y autenticación

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- PostgreSQL 12+
- npm o yarn

### **Instalación**

```bash
# Clonar el repositorio
git clone https://github.com/psarasua/mapaClientes-Astro.git
cd mapaClientes-Astro

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones de base de datos

# Ejecutar migraciones de base de datos
npm run db:migrate

# Iniciar servidor de desarrollo
npm run dev
```

### **Variables de Entorno**

```env
# Base de datos
DATABASE_URL=postgresql://usuario:password@localhost:5432/repartos_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=repartos_db
DB_USER=usuario
DB_PASSWORD=password

# JWT
JWT_SECRET=tu_clave_secreta_muy_segura

# Aplicación
NODE_ENV=development
PORT=4321
```

## 📱 Funcionalidades

### **🔐 Autenticación**
- Login con JWT
- Validación de sesiones
- Logout seguro
- Protección de rutas

### **👥 Gestión de Clientes**
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- 🔍 Búsqueda avanzada con filtros
- 📱 Vista responsive (tabla/cards)
- ✨ Formularios inteligentes con validación
- 💾 Autoguardado de formularios

### **🚛 Gestión de Camiones**
- ✅ Registro y control de flota
- 📊 Estados: Disponible, En Ruta, Mantenimiento
- 📋 Información detallada (patente, capacidad, etc.)
- 🔄 Actualización en tiempo real

### **📦 Sistema de Repartos**
- 📅 Planificación de entregas
- 🗺️ Asignación de rutas y camiones
- 👥 Vinculación con clientes
- 📈 Seguimiento de estado

### **📊 Dashboard**
- 📈 KPIs en tiempo real
- 📊 Gráficos interactivos
- 🎯 Métricas de rendimiento
- 📱 Responsive design

### **🗺️ Mapa Interactivo**
- 📍 Visualización de clientes
- 🛣️ Rutas optimizadas
- 📱 Interfaz móvil amigable

## 🛡️ Manejo de Errores

El sistema implementa un manejo robusto de errores:

- **Sin conexión a BD**: Muestra mensajes claros de error de conexión
- **Errores de validación**: Feedback inmediato en formularios
- **Errores de red**: Reintentos automáticos y notificaciones
- **Estados offline**: Funcionalidad limitada con Service Worker

## 🎨 Tecnologías Utilizadas

- **[Astro 5.15.3](https://astro.build/)** - Framework web moderno
- **JavaScript Puro** - Sin TypeScript para simplicidad
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de estilos
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación segura
- **PWA** - Progressive Web App
- **Netlify** - Plataforma de despliegue

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build

# Base de datos
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Datos de prueba

# Utilidades
npm run lint         # Linting del código
npm run format       # Formatear código
npm run type-check   # Verificar tipos
```

## 🚀 Despliegue

### **Netlify (Recomendado)**

```bash
# Build y despliegue automático
npm run build
netlify deploy --prod
```

### **Manual**

```bash
# Generar build de producción
npm run build

# Los archivos estáticos estarán en dist/
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Para reportar bugs o solicitar características:
- 🐛 [Issues](https://github.com/psarasua/mapaClientes-Astro/issues)
- 📧 Email: [tu-email@ejemplo.com]

## 📈 Roadmap

- [ ] Implementar notificaciones push
- [ ] Añadir modo offline completo
- [ ] Integración con APIs de mapas
- [ ] Dashboard de analytics avanzado
- [ ] App móvil nativa
- [ ] Integración con sistemas ERP

---

**Desarrollado con ❤️ para optimizar la gestión de repartos**