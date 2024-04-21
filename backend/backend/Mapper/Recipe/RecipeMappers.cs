using backend.DTO.Recipe;
using backend.Models;

namespace backend.Mappers;

public static class RecipeMappers
{
    public static RecipeDto ToRecipeDto(this Recipe recipeModel)
    {
        return new RecipeDto
        {
            Id = recipeModel.Id,
            Images = recipeModel.Images,
            Title = recipeModel.Title,
            Description = recipeModel.Description,
            PrepTime = recipeModel.PrepTime,
            CookTime = recipeModel.CookTime,
            Serving = recipeModel.Serving,
            Proteins = recipeModel.Proteins,
            Fats = recipeModel.Fats,
            Carbs = recipeModel.Carbs,
            Type = recipeModel.Type,
            CreatedAt = recipeModel.CreatedAt,
            UserId = recipeModel.UserId,
            CuisineId = recipeModel.CuisineId,
            TotalComments = recipeModel.Comments.Count
        };
    }

    public static Recipe ToRecipeFromCreateDto(this RecipeQuery recipeQuery)
    {
        return new Recipe
        {
            Images = recipeQuery.Images,
            Title = recipeQuery.Title,
            Description = recipeQuery.Description,
            PrepTime = recipeQuery.PrepTime,
            CookTime = recipeQuery.CookTime,
            Serving = recipeQuery.Serving,
            Proteins = recipeQuery.Proteins,
            Fats = recipeQuery.Fats,
            Carbs = recipeQuery.Carbs,
            Type = recipeQuery.Type,
            UserId = recipeQuery.UserId,
            CuisineId = recipeQuery.CuisineId,
            Comments = [],
            Ingredients = [],
            RecipeNotes = [],
            InstructionSteps = []
        };
    }
}