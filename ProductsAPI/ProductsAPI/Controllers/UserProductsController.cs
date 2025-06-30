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
                .Where(up => up.UserId == userId)
                .Include(up => up.Product)
                .Join(_context.Products,
                    up => up.ProductId,
                    p => p.Id,
                    (up, p) => new
                    {
                        up.Id,
                        up.Status,
                        up.PurchasePrice,
                        Product = new
                        {
                            p.Id,
                            p.Name,
                            p.Description,
                            p.Price
                        }
                    })
                .ToListAsync();

            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] CreateUserProductDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var product = new UserProduct
            {
                PurchasePrice = dto.PurchasePrice,
                Status = dto.Status,
                UserId = userId,
                ProductId = dto.ProductId
            };

            _context.UserProducts.Add(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateUserProductDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var product = await _context.UserProducts
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (product == null)
                return NotFound();

            product.PurchasePrice = dto.PurchasePrice;
            product.Status = dto.Status;

            await _context.SaveChangesAsync();
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var product = await _context.UserProducts
                .FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId);

            if (product == null)
                return NotFound();

            _context.UserProducts.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
