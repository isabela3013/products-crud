using DataAccessLayer.Repositories;
using DomainLayer.Models;

namespace ApplicationLayer.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
            => await _repository.GetAllAsync();

        public async Task<Product?> GetByIdAsync(int id)
            => await _repository.GetByIdAsync(id);

        public async Task<Product> CreateAsync(Product product)
        {
            // Validaciones extra si quieres (ej. nombre único)
            return await _repository.AddAsync(product);
        }

        public async Task<Product?> UpdateAsync(int id, Product product)
        {
            product.Id = id;
            return await _repository.UpdateAsync(product);
        }

        public async Task<bool> DeleteAsync(int id)
            => await _repository.DeleteAsync(id);
    }
}
