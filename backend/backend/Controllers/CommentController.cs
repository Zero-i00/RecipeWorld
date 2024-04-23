using backend.Constants;
using backend.Data;
using backend.DTO.Comment;
using backend.Mapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route($"{ApiConstants.BaseUrl}/comments")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly ApplicationDBContext _context;
    
    public CommentController(ApplicationDBContext context)
    {
        _context = context;
    }
    
    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> Retrieve([FromRoute] int id)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        return Ok(comment.ToCommentDto());
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] CommentQuery commentDto)
    {
        var commentModel = commentDto.ToCommentFromCreateDto();
        _context.Comments.Add(commentModel);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Retrieve), new {id = commentModel.Id}, commentModel.ToCommentDto());
    }
    
    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CommentQuery commentDto)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }
        
        comment.Title = commentDto.Title;
        comment.Text = commentDto.Text;
        comment.RecipeId = commentDto.RecipeId;
        comment.UserId = commentDto.UserId;
        
        await _context.SaveChangesAsync();

        return Ok(comment.ToCommentDto());
    }

    
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null)
        {
            return NotFound();
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
