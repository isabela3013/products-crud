using System.Text.Json.Serialization;

namespace DomainLayer.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
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
        
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public decimal? PurchasePrice { get; set; }
        public ProductStatus Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
