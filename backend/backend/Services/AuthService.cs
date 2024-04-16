using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class AuthService
{
    private readonly IConfiguration _configuration;
    
    public AuthService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
        
    public string HashPassword(string password)
    {
        using var hmac = new HMACSHA512();
        var passwordBytes = Encoding.UTF8.GetBytes(password);
        var hashBytes = hmac.ComputeHash(passwordBytes);
        return Convert.ToBase64String(hashBytes);
    }
    
    public bool VerifyPassword(string enteredPassword, string storedHash)
    {
        using var hmac = new HMACSHA512();
        var enteredPasswordBytes = Encoding.UTF8.GetBytes(enteredPassword);
        var storedHashBytes = Convert.FromBase64String(storedHash);
        var computedHash = hmac.ComputeHash(enteredPasswordBytes);
        /*return computedHash.SequenceEqual(storedHashBytes);*/
        return enteredPassword == storedHash;
    }

    public string GenerateJwtToken(string username)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
