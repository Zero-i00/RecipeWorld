using backend.Constants;
using backend.Data;
using backend.DTO.Recipe.Step;
using backend.Mapper.Recipe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Recipe;

[Route($"{ApiConstants.BaseUrl}/recipe/steps")]
[ApiController]
public class RecipeStepController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public RecipeStepController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> Retrieve([FromRoute] int id)
    {
        var step = await _context.RecipeInstructionSteps.FindAsync(id);
        if (step == null)
        {
            return NotFound();
        }

        return Ok(step.ToRecipeStepDto());
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] RecipeStepQuery stepDto)
    {
        var stepModel = stepDto.ToRecipeStepFromCreateDto();
        _context.RecipeInstructionSteps.Add(stepModel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Retrieve), new { id = stepModel.Id }, stepModel.ToRecipeStepDto());
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] RecipeStepQuery stepDto)
    {
        var step = await _context.RecipeInstructionSteps.FindAsync(id);
        if (step == null)
        {
            return NotFound();
        }

        step.Step = stepDto.Step;
        step.Text = stepDto.Text;
        step.RecipeId = stepDto.RecipeId;

        await _context.SaveChangesAsync();

        return Ok(step.ToRecipeStepDto());
    }


    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var step = await _context.RecipeInstructionSteps.FindAsync(id);
        if (step == null)
        {
            return NotFound();
        }

        _context.RecipeInstructionSteps.Remove(step);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
