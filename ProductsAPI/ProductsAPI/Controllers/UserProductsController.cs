using DataAccessLayer;
using DataAccessLayer.Entities;
using DomainLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductsAPI.DTOs;
using System.Security.Claims;

namespace ProductsAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public UserProductsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var products = await _context.UserProducts
                .Where(p => p.UserId == userId)
                .ToListAsync();
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] CreateUserProductDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var product = new UserProduct
            {
                Name = dto.Name,
                Description = dto.Description,
                PurchasePrice = dto.Price,
                Status = dto.Status,
                UserId = userId
            };

            _context.UserProducts.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
    }
}
