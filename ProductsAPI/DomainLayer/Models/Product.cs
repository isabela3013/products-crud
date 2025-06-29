using System.ComponentModel.DataAnnotations;

namespace DomainLayer.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        public string? Description { get; set; }
        
        [Range(0.01, double.MaxValue)]
        public decimal Price { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
