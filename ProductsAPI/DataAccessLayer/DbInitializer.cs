using DataAccessLayer.Entities;
using DomainLayer.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            try
            {
                await context.Database.MigrateAsync();

                // 1. Productos base
                if (!context.Products.Any())
                {
                    context.Products.AddRange(
                        new Product
                        {
                            Name = "Laptop",
                            Description = "Portátil de alto rendimiento ideal para desarrollo de software y multitarea.",
                            Price = 3000,
                            CreatedAt = DateTime.UtcNow
                        },
                        new Product
                        {
                            Name = "Mouse",
                            Description = "Mouse óptico inalámbrico con alta precisión y batería de larga duración.",
                            Price = 100,
                            CreatedAt = DateTime.UtcNow
                        },
                        new Product
                        {
                            Name = "Teclado",
                            Description = "Teclado mecánico retroiluminado con diseño ergonómico y switches silenciosos.",
                            Price = 150,
                            CreatedAt = DateTime.UtcNow
                        },
                        new Product
                        {
                            Name = "Monitor",
                            Description = "Monitor LED de 27 pulgadas Full HD con panel IPS y tecnología antirreflejo.",
                            Price = 900,
                            CreatedAt = DateTime.UtcNow
                        },
                        new Product
                        {
                            Name = "Webcam",
                            Description = "Webcam Full HD 1080p con micrófono integrado ideal para videollamadas.",
                            Price = 200,
                            CreatedAt = DateTime.UtcNow
                        }
                    );
                    await context.SaveChangesAsync();
                }

                // 2. Usuario base
                var defaultUserEmail = "demo@example.com";
                var user = await userManager.FindByEmailAsync(defaultUserEmail);
                if (user == null)
                {
                    user = new ApplicationUser
                    {
                        UserName = defaultUserEmail,
                        Email = defaultUserEmail,
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(user, "Password123!");
                }

                // 3. Asociar productos al usuario
                if (!context.UserProducts.Any())
                {
                    var products = await context.Products.Take(3).ToListAsync();

                    context.UserProducts.AddRange(
                        new UserProduct { ProductId = products[0].Id, UserId = user.Id, Status = ProductStatus.Pendiente, CreatedAt = DateTime.UtcNow },
                        new UserProduct { ProductId = products[1].Id, UserId = user.Id, Status = ProductStatus.Comprado, CreatedAt = DateTime.UtcNow },
                        new UserProduct { ProductId = products[2].Id, UserId = user.Id, Status = ProductStatus.Utilizado, CreatedAt = DateTime.UtcNow }
                    );

                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var error = ex.InnerException;
                //throw ex;
            }
            
        }
    }
}
