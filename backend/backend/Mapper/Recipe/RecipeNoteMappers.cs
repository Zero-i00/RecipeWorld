using backend.DTO.Ingredient;
using backend.DTO.Recipe.Note;
using backend.Models;

namespace backend.Mapper.Recipe;

public static class RecipeNoteMappers
{
    public static RecipeNoteDto ToRecipeNoteDto(this RecipeNote recipeNoteModel)
    {
        return new RecipeNoteDto
        {
            Id = recipeNoteModel.Id,
            Text = recipeNoteModel.Text,
            RecipeId = recipeNoteModel.RecipeId
        };
    }

    public static RecipeNote ToReciperNoteFromCreateDto(this RecipeNoteQuery recipeNoteQuery)
    {
        return new RecipeNote
        {
            Text = recipeNoteQuery.Text,
            RecipeId = recipeNoteQuery.RecipeId
        };
    }
}
