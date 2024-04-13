using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Constants;

namespace backend.Models;

[Table("comment")]
public class Comment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }
    
    [Required]
    [Column("title")]
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [Column("text")]
    [StringLength(ModelConstatns.TextFieldMaxValue)]
    public string Text { get; set; } = string.Empty;
    
    [Column("created_at")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    [Column("user_id")]
    [ForeignKey("User")]
    public int UserId { get; set; }
    
    [Column("recipe_id")]
    [ForeignKey("Recipe")]
    public int RecipeId { get; set; }
    
    public User User { get; set; }
    public Recipe Recipe { get; set; }
}
