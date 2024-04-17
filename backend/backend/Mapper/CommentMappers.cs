using backend.DTO.Comment;
using backend.Models;

namespace backend.Mapper;

public static class CommentMappers
{
    public static CommentDto ToCommentDto(this Comment commentModel)
    {
        return new CommentDto
        {
            Id = commentModel.Id,
            Title = commentModel.Title,
            Text = commentModel.Text,
            CreatedAt = commentModel.CreatedAt,
            RecipeId = commentModel.RecipeId,
            UserId = commentModel.UserId
        };
    }
   
    public static Comment ToCommentFromCreateDto(this CommentQuery commentQuery)
    {
        return new Comment()
        {
            Title = commentQuery.Title,
            Text = commentQuery.Text,
            RecipeId = commentQuery.RecipeId,
            UserId = commentQuery.UserId
        };
    }
}
