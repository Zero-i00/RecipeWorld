using backend.Constants;
using backend.Data;
using backend.DTO.Recipe.Note;
using backend.Mapper.Recipe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Recipe;


[Route($"{ApiConstants.BaseUrl}/recipe/notes")]
[ApiController]
public class RecipeNoteController : ControllerBase
{
    private readonly ApplicationDBContext _context;

    public RecipeNoteController(ApplicationDBContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> Retrieve([FromRoute] int id)
    {
        var note = await _context.RecipeNotes.FindAsync(id);
        if (note == null)
        {
            return NotFound();
        }

        return Ok(note.ToRecipeNoteDto());
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] RecipeNoteQuery noteDto)
    {
        var noteModel = noteDto.ToReciperNoteFromCreateDto();
        _context.RecipeNotes.Add(noteModel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Retrieve), new { id = noteModel.Id }, noteModel.ToRecipeNoteDto());
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] RecipeNoteQuery noteDto)
    {
        var note = await _context.RecipeNotes.FindAsync(id);
        if (note == null)
        {
            return NotFound();
        }

        note.Text = noteDto.Text;
        note.RecipeId = noteDto.RecipeId;
        await _context.SaveChangesAsync();

        return Ok(note);
    }


    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var note = await _context.RecipeNotes.FindAsync(id);
        if (note == null)
        {
            return NotFound();
        }

        _context.RecipeNotes.Remove(note);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
