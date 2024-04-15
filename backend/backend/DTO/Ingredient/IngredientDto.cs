using backend.Models;

namespace backend.DTO.Ingredient;

public class IngredientDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public float Amount { get; set; }
    public IngredientUnitEnum Unit { get; set; }
    public int RecipeId { get; set; }
}