using BusinessIntelligenceApi.DTOs;
using BusinessIntelligenceApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BusinessIntelligenceApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly List<User> _users; // In-memory storage for demo purposes

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
            _users = new List<User>
            {
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@businessintelligence.com",
                    PasswordHash = "admin123", // Temporary plain text for demo
                    Role = "Admin"
                },
                new User
                {
                    Id = 2,
                    Username = "user",
                    Email = "user@businessintelligence.com",
                    PasswordHash = "user123", // Temporary plain text for demo
                    Role = "User"
                },
                new User
                {
                    Id = 3,
                    Username = "carlos",
                    Email = "carlos@x-world.us",
                    PasswordHash = HashPassword("@Bravenewworld2"), // Your registered password
                    Role = "User"
                }
            };
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest request)
        {
            Console.WriteLine($"Login attempt for email: {request.Email}");
            var user = await GetUserByEmailAsync(request.Email);
            
            if (user == null)
            {
                Console.WriteLine($"User not found for email: {request.Email}");
                return null;
            }
            
            Console.WriteLine($"User found: {user.Username}, Hash: {user.PasswordHash}");
            var passwordValid = VerifyPassword(request.Password, user.PasswordHash);
            Console.WriteLine($"Password verification result: {passwordValid}");
            
            if (!passwordValid)
            {
                return null;
            }

            var token = GenerateJwtToken(user);
            
            return new LoginResponse
            {
                Token = token,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                ExpiresAt = DateTime.UtcNow.AddHours(24)
            };
        }

        public async Task<User?> RegisterAsync(RegisterRequest request)
        {
            // Check if user already exists
            var existingUser = await GetUserByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return null;
            }

            var user = new User
            {
                Id = _users.Count + 1,
                Username = request.Username,
                Email = request.Email,
                PasswordHash = HashPassword(request.Password),
                Role = "User"
            };

            _users.Add(user);
            return user;
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await Task.FromResult(_users.FirstOrDefault(u => u.Email == email));
        }

        public string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"] ?? "your-256-bit-secret-key-here-make-it-long-enough");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = jwtSettings["Issuer"] ?? "BusinessIntelligenceApi",
                Audience = jwtSettings["Audience"] ?? "BusinessIntelligenceApp"
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool VerifyPassword(string password, string hash)
        {
            Console.WriteLine($"Verifying password. Input: '{password}', Hash: '{hash}'");
            
            // Handle both plain text (demo users) and BCrypt hashed passwords
            if (hash.StartsWith("$2a$") || hash.StartsWith("$2b$") || hash.StartsWith("$2y$"))
            {
                Console.WriteLine("Using BCrypt verification");
                // BCrypt hash detected
                var result = BCrypt.Net.BCrypt.Verify(password, hash);
                Console.WriteLine($"BCrypt result: {result}");
                return result;
            }
            else
            {
                Console.WriteLine("Using plain text comparison");
                // Plain text comparison for demo users
                var result = password == hash;
                Console.WriteLine($"Plain text result: {result}");
                return result;
            }
        }

        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
    }
}
