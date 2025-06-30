namespace DomainLayer.Models
{
    public enum ProductStatus
    {
        Pendiente,
        Comprado,
        Utilizado
    }

    public class UserProduct
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        // public ApplicationUser User { get; set; }
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? PurchasePrice { get; set; }
        public ProductStatus Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
