using backend.Constants;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.DTO.Auth;
using backend.DTO.User;
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
    public async Task<IActionResult> Register([FromForm] RegisterQuery registerQuery)
    {
        var userDto = registerQuery.ToUserFromRegisterDto();

        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == userDto.Username);
        if (user != null) {
            return Conflict("User already exists.");
        }

        var hashedPassword = _authenticationService.HashPassword(userDto.Password);
        userDto.Password = hashedPassword;
        _context.Users.Add(userDto);
        await _context.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginQuery loginQuery)
    {
        var userDto = loginQuery.ToUserFromLoginDto();
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == userDto.Username);
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        var isPasswordValid = _authenticationService.VerifyPassword(userDto.Password, user.Password);
        if (!isPasswordValid)
        {
            return Unauthorized("Invalid password.");
        }

        var token = _authenticationService.GenerateJwtToken(userDto.Username);
        return Ok(new {
            accessToken = token
        });
    }
}