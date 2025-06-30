using DomainLayer.Models;

namespace ProductsAPI.DTOs
{
    public class CreateUserProductDto
    {
        public int ProductId { get; set; }
        public decimal? PurchasePrice { get; set; }
        public ProductStatus Status { get; set; }
    }
}
