using backend.DTO.Ingredient;
using backend.Models;

namespace backend.Mapper;

public static class IngredientMappers
{
   public static IngredientDto ToIngredientDto(this Ingredient ingredientModel)
   {
      return new IngredientDto
      {
         Id = ingredientModel.Id,
         Title = ingredientModel.Title,
         Amount = ingredientModel.Amount,
         Unit = ingredientModel.Unit,
         RecipeId = ingredientModel.RecipeId
      };
   }
   
   public static Ingredient ToIngredientFromCreateDto(this IngredientQuery ingredientQuery)
   {
      return new Ingredient
      {
         Title = ingredientQuery.Title,
         Amount = ingredientQuery.Amount,
         Unit = ingredientQuery.Unit,
         RecipeId = ingredientQuery.RecipeId,
      };
   }
}