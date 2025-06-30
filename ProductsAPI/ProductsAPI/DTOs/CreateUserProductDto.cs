using DomainLayer.Models;

namespace ProductsAPI.DTOs
{
    public class CreateUserProductDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public ProductStatus Status { get; set; }
    }
}
