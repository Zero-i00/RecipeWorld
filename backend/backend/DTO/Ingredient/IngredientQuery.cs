using backend.Models;

namespace backend.DTO.Ingredient;

public class IngredientQuery
{
    public string Title { get; set; }
    public float Amount { get; set; }
    public IngredientUnitEnum Unit { get; set; }
    public int RecipeId { get; set; }
    
}