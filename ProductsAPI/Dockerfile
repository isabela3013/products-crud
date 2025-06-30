# Etapa 1: Restaurar y compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["ProductsAPI/ProductsAPI.csproj", "ProductsAPI/"]
COPY ["ApplicationLayer/ApplicationLayer.csproj", "ApplicationLayer/"]
COPY ["DataAccessLayer/DataAccessLayer.csproj", "DataAccessLayer/"]
COPY ["DomainLayer/DomainLayer.csproj", "DomainLayer/"]
COPY ["ProductsAPI.sln", "./"]

RUN dotnet restore "ProductsAPI/ProductsAPI.csproj"

COPY . .
WORKDIR "/src/ProductsAPI"
RUN dotnet publish "ProductsAPI.csproj" -c Release -o /app/publish

# Etapa 2: Imagen final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "ProductsAPI.dll"]
