using DomainLayer.Models;
using Microsoft.AspNetCore.Identity;

namespace DataAccessLayer.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<UserProduct> Products { get; set; } = new List<UserProduct>();
    }
}
