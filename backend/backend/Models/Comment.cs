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
    [StringLength(ModelConstants.CharFieldMaxValue)]
    public string Title { get; set; }

    [Column("text")]
    [StringLength(ModelConstants.TextFieldMaxValue)]
    public string Text { get; set; } = string.Empty;

    [Column("created_at")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    
    [Required]
    [Column("recipe_id")]
    public int RecipeId { get; set; }
    
    [ForeignKey("RecipeId")]
    public virtual Recipe Recipe { get; set; }

    [Required]
    [Column("user_id")]
    public int UserId { get; set; }
    
    [ForeignKey("UserId")]
    public virtual User User { get; set; }
}