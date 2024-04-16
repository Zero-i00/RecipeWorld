using backend.Constants;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace backend.DTO.Recipe.Note;

public class RecipeNoteQuery
{
    public string Text { get; set; }

    public int RecipeId { get; set; }
}
