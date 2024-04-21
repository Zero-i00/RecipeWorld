using backend.Constants;
using backend.Data;
using backend.DTO.Ingredient;
using backend.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route($"{ApiConstants.BaseUrl}/ingredients")]
[ApiController]
public class IngredientController : ControllerBase
{
    private readonly ApplicationDBContext _context;
    
    public IngredientController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> Retrieve([FromRoute] int id)
    {
        var ingredient = await _context.Ingredients.FindAsync(id);
        if (ingredient == null)
        {
            return NotFound();
        }

        return Ok(ingredient.ToIngredientDto());
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromForm] IngredientQuery ingredientDto)
    {
        var ingredientModel = ingredientDto.ToIngredientFromCreateDto();
        _context.Ingredients.Add(ingredientModel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Retrieve), new {id = ingredientModel.Id}, ingredientModel.ToIngredientDto());
    }
    
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromForm] IngredientQuery ingredientDto)
    {
        var ingredient = await _context.Ingredients.FindAsync(id);
        if (ingredient == null)
        {
            return NotFound();
        }
        
        ingredient.Title = ingredientDto.Title;
        ingredient.Amount = ingredientDto.Amount;
        ingredient.Unit = ingredientDto.Unit;
        ingredient.RecipeId = ingredientDto.RecipeId;
        await _context.SaveChangesAsync();

        return Ok(ingredient.ToIngredientDto());
    }

    
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var ingredient = await _context.Ingredients.FindAsync(id);
        if (ingredient == null)
        {
            return NotFound();
        }

        _context.Ingredients.Remove(ingredient);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}