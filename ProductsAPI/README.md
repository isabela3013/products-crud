# Products API

API RESTful para la gestión de productos y productos asociados a usuarios. Desarrollada con ASP.NET Core 8 y Entity Framework Core.

## Tecnologías usadas

- ASP.NET Core 8
- Entity Framework Core
- Identity (autenticación con JWT)
- SQL Server

## Características

- CRUD de productos
- Registro y login de usuarios
- Asociación de productos a usuarios con estado y precio de compra
- Autenticación vía JWT

## Estructura del proyecto

- `ProductsAPI/` – Proyecto principal con los controladores
- `ApplicationLayer/` – Lógica de aplicación (servicios, DTOs)
- `DomainLayer/` – Entidades y enumeraciones
- `DataAccessLayer/` – Acceso a datos y contexto de EF

## Requisitos

- .NET 8 SDK
- SQL Server local o en la nube

## Configuración

1. Clonar el repositorio
2. Crear la base de datos SQL Server
3. Configurar `appsettings.json` con la cadena de conexión:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=ProductsDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

4. Ejecutar las migraciones:

```bash
dotnet ef database update --project DataAccessLayer
```

## Ejecución

```bash
dotnet run --project ProductsAPI
```

El API estará disponible en `https://localhost:7179`.

## Endpoints principales

- POST /api/auth/register

- POST /api/auth/login

- GET /api/product

- POST /api/product

- GET /api/userproducts (requiere token JWT)

