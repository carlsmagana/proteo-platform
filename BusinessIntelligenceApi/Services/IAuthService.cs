using BusinessIntelligenceApi.DTOs;
using BusinessIntelligenceApi.Models;

namespace BusinessIntelligenceApi.Services
{
    public interface IAuthService
    {
        Task<LoginResponse?> LoginAsync(LoginRequest request);
        Task<User?> RegisterAsync(RegisterRequest request);
        Task<User?> GetUserByEmailAsync(string email);
        string GenerateJwtToken(User user);
        bool VerifyPassword(string password, string hash);
        string HashPassword(string password);
    }
}
