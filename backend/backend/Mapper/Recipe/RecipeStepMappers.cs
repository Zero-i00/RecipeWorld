using backend.DTO.Recipe.Step;
using backend.Models;

namespace backend.Mapper.Recipe;

public static class RecipeStepMappers
{
    public static RecipeStepDto ToRecipeStepDto(this RecipeInstructionStep recipeStepModel)
    {
        return new RecipeStepDto
        {
            Id = recipeStepModel.Id,
            Step = recipeStepModel.Step,
            Text = recipeStepModel.Text,
            RecipeId = recipeStepModel.RecipeId
        };
    }

    public static RecipeInstructionStep ToRecipeStepFromCreateDto(this RecipeStepQuery recipeStepQuery)
    {
        return new RecipeInstructionStep
        {
            Step = recipeStepQuery.Step,
            Text = recipeStepQuery.Text,
            RecipeId = recipeStepQuery.RecipeId
        };
    }
}
