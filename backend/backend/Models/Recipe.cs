using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Constants;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public enum RecipeTypeEnum {
    First,
    Second,
    Salad,
    Dessert,
    Starter,
    Drink
}

[Table("recipe")]
public class Recipe
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("images")]
    public byte[][] Images { get; set; } // Предполагается, что это массив байтов для хранения изображений

    [Required]
    [Column("title")]
    [StringLength(ModelConstants.CharFieldMaxValue)]
    public string Title { get; set; }

    [Column("description")]
    [StringLength(ModelConstants.TextFieldMaxValue)]
    public string Description { get; set; } = String.Empty;
    
    [Required]
    [Column("prep_time")]
    [Range(0.001, double.MaxValue, ErrorMessage = "Время подготовки должно быть больше 0.")]
    public float PrepTime { get; set; }

    [Required]
    [Column("cook_time")]
    [Range(0.001, double.MaxValue, ErrorMessage = "Время приготовления должно быть больше 0.")]
    public float CookTime { get; set; }

    [Required]
    [Column("serving")]
    [Range(0, int.MaxValue, ErrorMessage = "Время серверовки должно быть  неотрицательным.")]
    public int Serving { get; set; }

    [Required]
    [Column("proteins")]
    [Range(0, double.MaxValue, ErrorMessage = "Количество белков должно быть неотрицательным.")]
    public float Proteins { get; set; }

    [Required]
    [Column("fats")]
    [Range(0, double.MaxValue, ErrorMessage = "Количество жиров должно быть неотрицательным.")]
    public float Fats { get; set; }

    [Required]
    [Column("carbs")]
    [Range(0, double.MaxValue, ErrorMessage = "Количество углеводов должно быть неотрицательным.")]
    public float Carbs { get; set; }

    [Required]
    [Column("type")]
    public RecipeTypeEnum Type { get; set; }

    [Column("created_at")]
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    
    [Required]
    [Column("user_id")]
    public int UserId { get; set; }
    
    [ForeignKey("UserId")]
    public virtual User User { get; set; }

    [Column("cuisine_id")] public int? CuisineId { get; set; }

    [ForeignKey("CuisineId")]
    public virtual Cuisine Cuisine { get; set; }
    
    public virtual ICollection<Comment> Comments { get; set; }
    public virtual ICollection<RecipeInstructionStep> InstructionSteps { get; set; }
    public virtual ICollection<RecipeNote> RecipeNotes { get; set; }
    public virtual ICollection<Ingredient> Ingredients { get; set; }
}


[Table("recipe_note")]
public class RecipeNote
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("text")]
    [StringLength(ModelConstants.TextFieldMaxValue)]
    public string Text { get; set; }
    
    public int RecipeId { get; set; }
    public virtual Recipe Recipe { get; set; }
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
    public int Step { get; set; }

    [Required]
    [Column("text")]
    [StringLength(ModelConstants.TextFieldMaxValue)]
    public string Text { get; set; }

    [Required]
    [Column("recipe_id")]
    public int RecipeId { get; set; }
    
    [ForeignKey("RecipeId")]
    public virtual Recipe Recipe { get; set; }
}