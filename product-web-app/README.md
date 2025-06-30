# Frontend de Productos

Aplicación React para consumir la API de productos. Permite ver, crear y asociar productos a un usuario autenticado.

## Tecnologías usadas

- React 18
- TypeScript
- Axios
- React Router DOM
- React Toastify
- Bootstrap 5

## Características

- Registro e inicio de sesión
- Listado de productos
- Agregar productos propios con estado y precio
- Edición y eliminación de productos propios
- Validaciones en formulario y alertas con Toast

## Requisitos

- Node.js 18+
- API ejecutándose localmente (`https://localhost:7179`)

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Aplicación disponible en `http://localhost:5173`.

## Estructura

- src/pages/ – Vistas principales

- src/components/ – Componentes reutilizables

- src/services/ – Lógica para consumo de API (axios)

- src/models/ – Interfaces TypeScript

- src/guards/ – Protecciones de rutas

- src/redux/ – Manejo global del usuario autenticado

## Configuración de entorno



