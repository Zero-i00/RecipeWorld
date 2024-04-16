using backend.Constants;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.DTO.Recipe.Step;

public class RecipeStepQuery
{
    public int Step { get; set; }
    public string Text { get; set; }
    public int RecipeId { get; set; }
}
