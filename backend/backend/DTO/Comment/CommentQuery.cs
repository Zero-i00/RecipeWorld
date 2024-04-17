namespace backend.DTO.Comment;

public class CommentQuery
{
    public string Title { get; set; }
    public string Text { get; set; } = string.Empty;
    public int RecipeId { get; set; }
    public int UserId { get; set; }
}
