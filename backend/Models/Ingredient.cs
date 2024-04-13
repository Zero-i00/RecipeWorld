using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Constants;

namespace backend.Models;


public enum IngredientUnitEnum {
    Milligrams,
    Grams,
    Kilograms,
    Milliliters,
    Liters,
    Pieces
} 

[Table("ingredient")]
public class Ingredient
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    
    [Required]
    [Column("title")]
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [Range(0.001, double.MaxValue, ErrorMessage = "Количество должно быть больше 0.")]
    public float Amount { get; set; } = 0;

    [Required] 
    [Column("unit")] 
    public IngredientUnitEnum Unit { get; set; } = IngredientUnitEnum.Pieces;

    [Column("recipe_id")]
    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }

    public Recipe Recipe { get; set; }
}
