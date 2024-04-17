namespace backend.DTO.Comment;

public class CommentDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Text { get; set; }
    public DateTime CreatedAt { get; set; }
    public int RecipeId { get; set; }
    public int UserId { get; set; }
}
