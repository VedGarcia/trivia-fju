# 🎯 Trivia FJU

Juego de preguntas y respuestas interactivo desarrollado con React, TypeScript y Redux. Permite crear preguntas, formar equipos y competir en tiempo real.

## 🚀 Características

- ✨ **Creación de Preguntas**: Formulario intuitivo para agregar preguntas con 4 opciones de respuesta
- 👥 **Gestión de Equipos**: Agregar, editar y eliminar equipos con colores únicos
- 🎮 **Juego Interactivo**: Todos los equipos responden la misma pregunta simultáneamente
- 📊 **Puntuación en Tiempo Real**: Sistema de puntos que se actualiza automáticamente
- 💾 **Persistencia**: Los datos se guardan automáticamente en localStorage
- 🎨 **Interfaz Moderna**: Diseño atractivo con Tailwind CSS y animaciones
- 🏆 **Sistema de Ganadores**: Visualización clara de equipos ganadores y resultados finales

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.1**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript 5.9.3**: Superset de JavaScript que añade tipado estático
- **Vite 7.1.7**: Herramienta de construcción rápida y moderna
- **Tailwind CSS 4.1.17**: Framework de CSS utility-first para diseño rápido

### Estado y Datos
- **Redux Toolkit 2.10.1**: Librería para manejo de estado global
- **React Redux 9.2.0**: Bindings oficiales de React para Redux
- **React Hook Form 7.66.0**: Librería para manejo de formularios con validación

### Routing
- **React Router DOM 7.9.5**: Enrutamiento declarativo para aplicaciones React

### Animaciones
- **Framer Motion 12.23.24**: Librería de animaciones para React (disponible pero no utilizado actualmente)

## 📁 Estructura del Proyecto

```
trivia-fju/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── AddQuestion/     # Formulario para agregar preguntas
│   │   ├── AddTeam/         # Formulario para agregar equipos
│   │   ├── AnswerOption/    # Componente para opciones de respuesta
│   │   ├── CorrectAnswerAnimation/  # Animación de respuesta correcta
│   │   ├── Layout/          # Layout principal de la aplicación
│   │   ├── Modal/           # Modal reutilizable
│   │   ├── ScoreBoard/      # Tablero de puntuaciones
│   │   ├── TeamList/        # Lista de equipos con edición
│   │   └── TeamSelector/    # Selector de equipos
│   ├── features/            # Slices de Redux
│   │   ├── admin/           # Slice para preguntas
│   │   └── game/            # Slice para estado del juego
│   ├── models/              # Tipos TypeScript
│   │   └── types.ts         # Interfaces y tipos
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Admin/           # Página de administración
│   │   ├── Game/            # Página del juego
│   │   └── Home/            # Página de inicio
│   ├── services/            # Servicios
│   │   └── persistence.ts   # Servicio de persistencia en localStorage
│   ├── store.ts             # Configuración del store de Redux
│   ├── utils/               # Utilidades
│   │   └── teamColors.ts    # Utilidad para colores de equipos
│   └── App.tsx              # Componente principal
└── package.json
```

## 🎮 Flujo del Juego

### 1. Configuración Inicial (Página de Inicio)
- El usuario accede a la página de inicio
- Puede iniciar el juego o acceder a la administración
- Botón principal "Iniciar Juego" lleva a la configuración del juego
- Botón de administración para gestionar preguntas

### 2. Administración de Preguntas
- **Crear Preguntas**: 
  - Click en "Nueva Pregunta" abre un modal
  - Se completa el formulario con:
    - Texto de la pregunta
    - 4 opciones de respuesta
    - Selección de la respuesta correcta (radio button)
  - Al enviar, la pregunta se guarda en Redux y localStorage

### 3. Configuración del Juego
- **Agregar Equipos**:
  - Se agregan equipos uno por uno
  - Cada equipo recibe un color único automáticamente
  - Se pueden editar nombres o eliminar equipos
- **Iniciar Juego**:
  - Requiere al menos un equipo y una pregunta
  - Al hacer click en "Iniciar Juego", comienza la partida

### 4. Durante el Juego

#### Selección de Respuestas
1. **Seleccionar Equipo**: Se elige el equipo activo desde el selector
2. **Seleccionar Respuesta**: El equipo activo selecciona una opción
3. **Repetir**: Se repite el proceso para cada equipo
4. **Visualización**: Todas las selecciones son visibles simultáneamente con colores únicos por equipo

#### Confirmación
- Cuando **todos los equipos** han seleccionado una respuesta, aparece el botón "Confirmar Todas las Respuestas"
- Al confirmar:
  1. Se muestra una animación de respuesta correcta (2 segundos)
  2. Se muestran los resultados con equipos ganadores destacados
  3. Se asignan puntos: +10 puntos por respuesta correcta, 0 por incorrecta
  4. Se muestra el botón "Siguiente Pregunta"

#### Siguiente Pregunta
- Al hacer click en "Siguiente Pregunta", se pasa a la siguiente pregunta
- Las selecciones se reinician para la nueva pregunta
- El proceso se repite hasta completar todas las preguntas

### 5. Fin del Juego
- Se muestra la pantalla de resultados finales
- Ganador destacado con trofeo
- Puntuación final ordenada de mayor a menor
- Opciones:
  - **Nuevo Juego**: Reinicia los scores pero mantiene los equipos
  - **Ir a Administración**: Navega al panel de administración

## 🔧 Funcionamiento de las Tecnologías

### Redux Toolkit
- **Store Centralizado**: Todo el estado de la aplicación se maneja en un store único
- **Slices**:
  - `questionsSlice`: Maneja las preguntas (agregar, eliminar, actualizar)
  - `gameSlice`: Maneja el estado del juego (equipos, puntuaciones, pregunta actual)
- **Persistencia Automática**: El store se subscribe a cambios y guarda en localStorage automáticamente
- **Acciones**:
  - `addQuestion`: Agrega una nueva pregunta
  - `addTeam`: Agrega un equipo
  - `updateScore`: Actualiza la puntuación de un equipo
  - `nextQuestion`: Avanza a la siguiente pregunta
  - `resetScores`: Reinicia los scores manteniendo equipos

### React Hook Form
- **Validación de Formularios**: Validación automática de campos requeridos
- **FormProvider**: Contexto para compartir el formulario entre componentes
- **useFormContext**: Hook para acceder al formulario desde componentes anidados
- Se utiliza en:
  - Formulario de creación de preguntas
  - Validación de opciones de respuesta

### React Router DOM
- **Rutas**:
  - `/`: Página de inicio
  - `/game`: Página del juego
  - `/admin`: Página de administración
- **Navegación Programática**: Uso de `useNavigate` para navegar entre páginas

### Tailwind CSS
- **Utility-First**: Clases utilitarias para diseño rápido
- **Responsive Design**: Clases responsive para diferentes tamaños de pantalla
- **Backdrop Blur**: Efectos de desenfoque para modales y overlays
- **Gradientes**: Fondos con gradientes para diseño moderno

### TypeScript
- **Tipado Estricto**: Interfaces y tipos para todas las estructuras de datos
- **Type Safety**: Detección de errores en tiempo de compilación
- **IntelliSense**: Autocompletado mejorado en el IDE

### LocalStorage (Persistencia)
- **Servicio de Persistencia**: `services/persistence.ts`
- **Guardado Automático**: El store se subscribe y guarda automáticamente
- **Carga Inicial**: Los datos se cargan al iniciar la aplicación
- **Claves**:
  - `questions`: Preguntas guardadas
  - `game`: Estado del juego

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (v18 o superior)
- Yarn (gestor de paquetes)

### Instalación
```bash
# Instalar dependencias
yarn install
```

### Desarrollo
```bash
# Iniciar servidor de desarrollo
yarn dev
```

### Construcción
```bash
# Construir para producción
yarn build
```

### Vista Previa
```bash
# Vista previa de la construcción
yarn preview
```

## 📝 Scripts Disponibles

- `yarn dev`: Inicia el servidor de desarrollo con Vite
- `yarn build`: Construye la aplicación para producción
- `yarn preview`: Previsualiza la construcción de producción
- `yarn lint`: Ejecuta el linter para verificar el código

## 🎨 Características de Diseño

### Colores de Equipos
- Cada equipo recibe automáticamente un color único
- 8 colores predefinidos que se rotan si hay más equipos
- Los colores se muestran consistentemente en toda la aplicación

### Modales y Overlays
- **Backdrop Blur**: Efecto de desenfoque en el fondo
- **Transparencia**: Contenido de fondo visible pero borroso
- **Animaciones**: Transiciones suaves para mejor UX

### Responsive Design
- Diseño adaptable para diferentes tamaños de pantalla
- Layout de 2 columnas en pantallas grandes
- Layout de 1 columna en pantallas pequeñas

## 🔄 Flujo de Datos

1. **Usuario interactúa** → Acción del usuario (click, input, etc.)
2. **Componente dispatch** → Dispara una acción de Redux
3. **Reducer procesa** → Actualiza el estado en el store
4. **Store notifica** → Los componentes suscritos se actualizan
5. **Persistencia** → El store se guarda automáticamente en localStorage
6. **UI se actualiza** → Los componentes muestran el nuevo estado

## 📊 Estado de la Aplicación

### Estado de Preguntas
```typescript
questions: Question[]  // Array de preguntas
```

### Estado del Juego
```typescript
{
  status: 'idle' | 'playing' | 'finished',
  questions: Question[],
  teams: Team[],
  currentQuestionIndex: number,
  currentQuestion: Question | null,
  // ...
}
```

## 🎯 Próximas Mejoras

- [ ] Animaciones más fluidas con Framer Motion
- [ ] Sonidos y efectos de audio
- [ ] Modo multijugador en tiempo real
- [ ] Estadísticas y gráficos de rendimiento
- [ ] Temas personalizables
- [ ] Exportar/importar preguntas
- [ ] Modo de práctica individual

## 📄 Licencia

Este proyecto es privado y está destinado para uso interno.

## 👥 Autor

Desarrollado para FJU (Facultad de Jurisprudencia)

---

¡Disfruta jugando Trivia FJU! 🎮✨
