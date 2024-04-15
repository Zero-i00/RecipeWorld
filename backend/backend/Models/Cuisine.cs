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
    [StringLength(ModelConstants.CharFieldMaxValue)]
    public string Name { get; set; }

    public virtual ICollection<Recipe> Recipes { get; set; }
}