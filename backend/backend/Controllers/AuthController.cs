using backend.Constants;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTO.Auth;
using backend.Mapper;
using Microsoft.EntityFrameworkCore;

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
    public async Task<IActionResult> Register([FromBody] RegisterQuery registerQuery)
    {
        /*var hashedPassword = _authenticationService.HashPassword(password);*/
        var user = registerQuery.ToUserFromRegisterDto();
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginQuery loginQuery)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == loginQuery.Username);
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        var isPasswordValid = _authenticationService.VerifyPassword(loginQuery.Password, user.Password);
        if (!isPasswordValid)
        {
            return Unauthorized("Invalid password.");
        }

        var token = _authenticationService.GenerateJwtToken(loginQuery.Username);
        return Ok(new {
            user,
            token
        });
    }
}