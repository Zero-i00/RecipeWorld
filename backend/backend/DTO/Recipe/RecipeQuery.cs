using backend.Models;

public class RecipeQuery
{
    public string Image { get; set; }
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
}
