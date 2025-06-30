# 🛠️ Products CRUD - Proyecto Full Stack

Este es un proyecto full stack para la gestión de productos con autenticación de usuarios, desarrollado con:

- **Backend**: ASP.NET Core (.NET 8), Entity Framework Core, SQL Server, Autenticación JWT
- **Frontend**: React + Vite + Redux + Bootstrap

## 📂 Estructura del Proyecto

- `/ProductsApi`: API en ASP.NET Core
- `/product-web-app`: Aplicación web en React

## 🚀 Primeros pasos

### Requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [Node.js](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/es-es/sql-server/)
- Postman (opcional, para probar la API)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/products-crud.git
cd products-crud
```

### 2. Configurar y ejecutar la API

```bash
cd ProductsApi
dotnet restore
dotnet ef database update
dotnet run
```

### 3. Configurar y ejecutar el frontend

```bash
cd ../product-web-app
npm install
npm run dev
```

## 🧩 Funcionalidades

- CRUD completo de productos
- Registro e inicio de sesión de usuarios
- Asociación de productos por usuario
- Autenticación basada en JWT
- Rutas protegidas y manejo de estado con Redux

## 🧑‍💻 Autora

Isabella Jaramillo
GitHub: [@isabela3013](https://github.com/isabela3013)
