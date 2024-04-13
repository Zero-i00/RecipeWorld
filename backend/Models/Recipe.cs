using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Constants;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

[Table("recipe")]
public class Recipe
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    
    [Column("images")]
    public List<string> Images { get; set; } = new List<string>();

    [Required]
    [Column("title")]
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [Column("descirption")]
    [StringLength(ModelConstatns.TextFieldMaxValue)]
    public string Description { get; set; } = string.Empty;
    
    [Required]
    [Column("prep_time")]
    [Range(0.001, double.MaxValue, ErrorMessage = "Время подготовки должно быть больше 0.")]
    public float PrepTime { get; set; } = 0;
    
    [Required]
    [Column("cook_time")]
    [Range(0.001, double.MaxValue, ErrorMessage = "Время приготовления должно быть больше 0.")]
    public float CookTime { get; set; } = 0;
    
    [Required]
    [Column("serving")]
    [Range(0, int.MaxValue, ErrorMessage = "Время серверовки должно быть  неотрицательным.")]
    public int Serving { get; set; } = 0;
    
    [Required]
    [Column("proteins")]
    [Range(0, double.MaxValue, ErrorMessage = "Количество белков должно быть неотрицательным.")]
    public float Proteins { get; set; } = 0;
    
    [Required]
    [Column("fats")]
    [Range(0, double.MaxValue, ErrorMessage = "Количество жиров должно быть неотрицательным.")]
    public float Fats { get; set; } = 0;
    
    [Required]
    [Column("carbs")]
    [Range(0, double.MaxValue, ErrorMessage = "Количество углеводов должно быть неотрицательным.")]
    public float Carbs { get; set; } = 0;

    [Required]
    [Column("type")]
    public RecipeTypeEnum Type { get; set; } = RecipeTypeEnum.Second;

    [Column("created_at")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    [Column("user_id")]
    [ForeignKey("User")]
    public int UserId { get; set; }

    [Column("cuisine_id")]
    [ForeignKey("Cuisine")]
    public int CuisineId { get; set; }

    public List<Comment> Comments { get; set; } = new List<Comment>();
    public List<Ingredient> Ingredients { get; set; } = new List<Ingredient>();
    public List<RecipeInstructionStep> Steps { get; set; } = new List<RecipeInstructionStep>();
    public List<RecipeNote> Notes { get; set; } = new List<RecipeNote>();

    public User User { get; set; }
    public Cuisine Cuisine { get; set; }
}

public enum RecipeTypeEnum {
    First,
    Second,
    Salad,
    Dessert,
    Starter,
    Drink
}

[Table("recipe_note")]
public class RecipeNote
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("text")]
    [StringLength(ModelConstatns.TextFieldMaxValue)]
    public string Text { get; set; } = string.Empty;
    
    [Column("recipe_id")]
    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }
    
    public Recipe Recipe { get; set; }
}

[Table("recipe_instruction_step")]
public class RecipeInstructionStep
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required] 
    [Column("step")] 
    [Range(0, int.MaxValue, ErrorMessage = "Шаг пригоовления долже быть неотрицательным.")]
    public int Step { get; set; } = 0;
    
    [Required]
    [Column("text")]
    [StringLength(ModelConstatns.TextFieldMaxValue)]
    public string Text { get; set; } = string.Empty;

    [Column("recipe_id")]
    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }

    public Recipe Recipe { get; set; }
}
