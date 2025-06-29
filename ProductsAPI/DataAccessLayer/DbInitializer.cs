using DomainLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer
{
    public static class DbInitializer
    {
        public static void Seed(ApplicationDbContext context)
        {
            // Asegura que la base de datos exista
            context.Database.Migrate();

            if (context.Products.Any())
                return; // Ya está poblada

            var products = new List<Product>
            {
                new() { Name = "Laptop", Description = "Dell XPS 13", Price = 1200.00m },
                new() { Name = "Mouse", Description = "Logitech MX Master 3", Price = 85.00m },
                new() { Name = "Monitor", Description = "Samsung 27\"", Price = 320.00m },
                new() { Name = "Teclado", Description = "Keychron K2", Price = 95.00m },
                new() { Name = "Auriculares", Description = "Sony WH-1000XM5", Price = 350.00m }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
