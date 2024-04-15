using backend.Constants;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Services;

namespace backend.Controllers;

[Route($"{ApiConstants.BaseUrl}/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AuthService _authenticationService;
    private readonly ApplicationDBContext _context;

    public AuthController(AuthService authenticationService, ApplicationDBContext context)
    {
        _authenticationService = authenticationService;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(string username, string password)
    {
        var hashedPassword = _authenticationService.HashPassword(password);
        var user = new User { Username = username, Password = hashedPassword };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login(string username, string password)
    {
        var user = _context.Users.SingleOrDefault(u => u.Username == username);
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        var isPasswordValid = _authenticationService.VerifyPassword(password, user.Password);
        if (!isPasswordValid)
        {
            return Unauthorized("Invalid password.");
        }

        var token = _authenticationService.GenerateJwtToken(username);
        return Ok(new { token });
    }
}