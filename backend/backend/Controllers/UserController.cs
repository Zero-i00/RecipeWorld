using backend.Constants;
using backend.Data;
using backend.DTO.Auth;
using backend.DTO.User;
using backend.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers;

[Route($"{ApiConstants.BaseUrl}/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ApplicationDBContext _context;
    private readonly IConfiguration _configuration;

    public UserController(ApplicationDBContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpGet]
    public IActionResult GetUserByToken()
    {
        try
        {
            // Получаем токен из заголовка Authorization
            var authHeader = Request.Headers["Authorization"].ToString();
            var token = authHeader.Replace("Bearer ", string.Empty);

            // Получаем ключ и другие параметры из конфигурации
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = _configuration["Jwt:Issuer"],
                ValidateAudience = true,
                ValidAudience = _configuration["Jwt:Audience"],
                ValidateLifetime = true, // Вам может потребоваться валидация времени жизни токена
                ClockSkew = TimeSpan.Zero
            };

            // Декодируем токен
            var handler = new JwtSecurityTokenHandler();
            var principal = handler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

            // Получаем имя пользователя из токена
            var username = principal.Claims.First(c => c.Type == ClaimTypes.Name).Value;

            // Получаем пользователя из базы данных
            var user = _context.Users.SingleOrDefault(u => u.Username == username);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Возвращаем пользователя
            return Ok(user.ToUserDto());
        }
        catch (Exception ex)
        {
            // Обработка ошибок
            return BadRequest("Invalid token.");
        }
    }



    [HttpGet("{id}/recipes_list")]
    [Authorize]
    public async Task<ActionResult> GetUserRecipesList([FromRoute] int id)
    {

        var recipes = await _context.Recipes.ToListAsync();
        var response = recipes.Where(recipe => recipe.UserId == id); 

        return Ok(response);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UserQuery userDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }


        user.Username = userDto.Username;
        user.Avatar = userDto.Avatar;
        user.FirstName = userDto.FirstName;
        user.LastName = userDto.LastName;

        await _context.SaveChangesAsync();

        return Ok(user.ToUserDto());
    }


    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
