using backend.Constants;
using backend.Data;
using backend.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers.Recipe;

[ApiController]
[Route($"{ApiConstants.BaseUrl}/recipes")]
public class RecipesController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public RecipesController(ApplicationDBContext context)
    {
        _context = context;
    }
    
    [HttpGet("{id}/ingredients")]
    [Authorize]
    public async Task<ActionResult> GetRecipeIngredients([FromRoute] int id)
    {
        var ingredients = await _context.Ingredients.ToListAsync();
        var response = ingredients.Where(ingredient => ingredient.RecipeId == id);  


        return Ok(response);
    }
    
    [HttpGet("{id}/comments")]
    [Authorize]
    public async Task<ActionResult> GetRecipeComments([FromRoute] int id)
    {
        var comments = await _context.Comments
            .Include(c => c.User) // ѕредполагаетс€, что у вас есть навигационное свойство User в модели Comment
            .Where(comment => comment.RecipeId == id)
            .ToListAsync();

        // ≈сли вы хотите вернуть только определенные пол€ пользовател€, вы можете использовать Select
        var response = comments.Select(comment => new
        {
            id = comment.Id,
            title = comment.Title,
            text = comment.Text,
            created_at = comment.CreatedAt,
            userId = comment.UserId,
            userName = comment.User.FirstName + " " + comment.User.LastName,                          
        });

        return Ok(response);
    }
    
    [HttpGet("{id}/instruction_steps")]
    [Authorize]
    public async Task<ActionResult> GetRecipeInstructionSteps([FromRoute] int id)
    {
        var steps = await _context.RecipeInstructionSteps.ToListAsync();
        var response = steps.Where(step => step.RecipeId == id);


        return Ok(response);
    }
    
    [HttpGet("{id}/recipe_notes")]
    [Authorize]
    public async Task<ActionResult> GetRecipeNotes([FromRoute] int id)
    {
        var notes = await _context.RecipeNotes.ToListAsync();
        var response = notes.Where(note => note.RecipeId == id);


        return Ok(response);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> List([FromQuery] bool byRating)
    {
        IQueryable<Models.Recipe> query = _context.Recipes.AsQueryable();

        if (byRating)
        {
            query = query.Include(r => r.Comments);
            query = query.OrderByDescending(r => r.Comments.Count);
        }

        var recipes = await query.ToListAsync();

        return Ok(recipes);
    }
    
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> Retrieve([FromRoute] int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe == null)
        {
            return NotFound();
        }

        return Ok(recipe.ToRecipeDto());
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] RecipeQuery recipeDto)
    {
        var recipeModel = recipeDto.ToRecipeFromCreateDto();
        _context.Recipes.Add(recipeModel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Retrieve), new {id = recipeModel.Id}, recipeModel.ToRecipeDto());
    }
    
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] RecipeQuery recipeDto)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe == null)
        {
            return NotFound();
        }

        recipe.Image = recipeDto.Image;
        recipe.Title = recipeDto.Title;
        recipe.Description = recipeDto.Description;
        recipe.PrepTime = recipeDto.PrepTime;
        recipe.CookTime = recipeDto.CookTime;
        recipe.Serving = recipeDto.Serving;
        recipe.Proteins = recipeDto.Proteins;
        recipe.Fats = recipeDto.Fats;
        recipe.Carbs = recipeDto.Carbs;
        recipe.Type = recipeDto.Type;
        recipe.CuisineId = recipeDto.CuisineId;
        await _context.SaveChangesAsync();

        return Ok(recipe.ToRecipeDto());
    }
    
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe == null)
        {
            return NotFound();
        }

        _context.Recipes.Remove(recipe);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
