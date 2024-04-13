using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Constants;

namespace backend.Models;

[Table("cuisine")]
public class Cuisine
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    
    [Required]
    [Column("name")]
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    public string Name { get; set; } = string.Empty;

    [Column("recipe_id")]
    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }
    
    public Recipe Recipe { get; set; }
}