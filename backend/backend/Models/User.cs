using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Constants;

namespace backend.Models;

[Table("user")]
public class User
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Required]
    [Column("username")]
    [StringLength(ModelConstants.CharFieldMaxValue)]
    public string Username { get; set; }

    [Required]
    [Column("password")]
    [MinLength(ModelConstants.PasswordFieldMinValue)]
    [StringLength(ModelConstants.CharFieldMaxValue)]
    [RegularExpression(RegexPatterns.PasswordPattern, ErrorMessage = "Пароль должен содержать по меньшей мере одну цифру, одну заглавную букву, одну строчную букву и один специальный символ.")]
    public string Password { get; set; }

    [Column("avatar")]
    public byte[]? Avatar { get; set; }

    [Required]
    [Column("first_name")]
    [StringLength(ModelConstants.CharFieldMaxValue)]
    public string FirstName { get; set; } = string.Empty;

    [Required]
    [Column("last_name")]
    [StringLength(ModelConstants.CharFieldMaxValue)]
    public string LastName { get; set; } = string.Empty;

    public virtual ICollection<Recipe> Recipes { get; set; }
    public virtual ICollection<Comment> Comments { get; set; }
}
