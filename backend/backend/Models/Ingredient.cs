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
    [StringLength(ModelConstants.CharFieldMaxValue)]
    public string Title { get; set; }

    [Required]
    [Column("amount")]
    [Range(0, double.MaxValue, ErrorMessage = "Количество должно быть больше 0.")]
    [DisplayFormat(DataFormatString = "{0:F2}", ApplyFormatInEditMode = true)]
    public float Amount { get; set; }

    [Required]
    [Column("unit")]
    public IngredientUnitEnum Unit { get; set; }
    
    [Required]
    [Column("recipe_id")]
    public int RecipeId { get; set; }
    
    [ForeignKey("RecipeId")]
    public virtual Recipe Recipe { get; set; }
}