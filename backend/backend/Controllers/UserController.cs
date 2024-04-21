using backend.Constants;
using backend.Data;
using backend.DTO.Auth;
using backend.DTO.User;
using backend.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    [Route($"{ApiConstants.BaseUrl}/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public UserController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Retrieve([FromRoute] int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.ToUserDto());
        }

        [HttpGet("{id}/recipes_list")]
        [Authorize]
        public async Task<ActionResult> GetUserRecipesList([FromRoute] int id)
        {
            var user = await _context.Users
                .Include(r => r.Recipes)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (user == null)
            {
                return NotFound();
            }


            return Ok(user.Recipes.ToList());
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromForm] UserQuery userDto)
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
}
