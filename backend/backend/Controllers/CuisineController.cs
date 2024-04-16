using backend.Constants;
using backend.Data;
using backend.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[Route($"{ApiConstants.BaseUrl}/cuisines")]
[ApiController]
public class CuisineController : ControllerBase
{
    private readonly ApplicationDBContext _context;
    
    public CuisineController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> List()
    {
        var cuisines = await _context.Cuisines.ToListAsync();
        var result = cuisines.Select(c => c.ToCuisineDto());
        return Ok(result);
    }
}
