# Schelendar 📅

Una aplicación moderna de calendario y eventos construida con Next.js 15 y TypeScript.

## 🚀 Características Principales

- Interfaz de usuario moderna y responsive
- Gestión de estado eficiente con Zustand
- Animaciones fluidas con Framer Motion
- Validación de datos robusta con Zod
- Sistema de notificaciones elegante con Sonner
- Manejo de fechas preciso con date-fns
- Diseño elegante con TailwindCSS y HeroUI

## 🛠️ Tecnologías Utilizadas

### Core
- **Next.js 15** - Framework de React que ofrece:
  - Renderizado híbrido (SSR/SSG)
  - Optimización automática de imágenes
  - Enrutamiento basado en sistema de archivos
  - Soporte para API Routes
  - Turbopack para desarrollo ultrarrápido

- **TypeScript** - Añade tipado estático para un desarrollo más seguro y mantenible

### Gestión de Estado
- **Zustand** - Elegido sobre Redux por:
  - API minimalista y más simple
  - Bundle size significativamente menor (~1KB vs ~20KB de Redux)
  - No requiere Provider wrapping
  - Mejor integración con TypeScript
  - Mejor rendimiento en actualizaciones parciales
  - Curva de aprendizaje más corta
  - Posibilidad de crear múltiples stores independientes

### UI/UX
- **TailwindCSS** - Framework de utilidades CSS para:
  - Desarrollo rápido y consistente
  - Bundle size optimizado
  - Personalización sencilla
  
- **Framer Motion** - Biblioteca de animaciones para:
  - Transiciones fluidas
  - Gestos interactivos
  - Animaciones complejas con API declarativa

- **@heroui/react** - Componentes UI prediseñados y accesibles

- **@tabler/icons-react** - Set de iconos modernos y personalizables

### Utilidades
- **date-fns** - Manipulación de fechas moderna y ligera

- **zod** - Validación de esquemas con:
  - Inferencia de tipos TypeScript
  - API declarativa
  - Mensajes de error personalizables

- **sonner** - Sistema de notificaciones toast minimalista

## 🚀 Comenzando

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo (con Turbopack)
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm run start
```

## 📦 Estructura del Proyecto

```
schelendar/
├── src/
│   ├── app/                # Rutas y páginas
│   ├── components/         # Componentes reutilizables
│   ├── store/              # Stores de Zustand
│   ├── hooks/              # Custom hooks
│   ├── schemas/            # Schemas para validaciones de zod
│   ├── utils/              # Utilidades
└── └── types/              # Definiciones de tipos
```
