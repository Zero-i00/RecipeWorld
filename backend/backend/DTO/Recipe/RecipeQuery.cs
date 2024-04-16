using backend.Models;


public class RecipeQuery
{
    public byte[][] Images { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public float PrepTime { get; set; }
    public float CookTime { get; set; }
    public int Serving { get; set; }
    public float Proteins { get; set; }
    public float Fats { get; set; }
    public float Carbs { get; set; }
    public RecipeTypeEnum Type { get; set; }
    public int UserId { get; set; }
    public int? CuisineId { get; set; }

    public virtual ICollection<Ingredient> Ingredients { get; set; }
    public virtual ICollection<RecipeInstructionStep> InstructionSteps { get; set; }
    public virtual ICollection<RecipeNote> RecipeNotes { get; set; }
}
