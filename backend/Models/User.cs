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
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    public string Username { get; set; } = string.Empty;
    
    [Required]
    [Column("password")]
    [MinLength(ModelConstatns.PasswordMinLength)]
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    [RegularExpression(RegexPatterns.PasswordPattern, ErrorMessage = "Пароль должен содержать по меньшей мере одну цифру, одну заглавную букву, одну строчную букву и один специальный символ.")]
    public string Password { get; set; } = string.Empty;
    
    [Column("avatar")]
    public string Avatar { get; set; } = string.Empty;
    
    [Required]
    [Column("first_name")]
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    [Column("last_name")]
    [StringLength(ModelConstatns.CharFieldMaxValue)]
    public string LastName { get; set; } = string.Empty;
    
    
    public List<Comment> Comments { get; set; } = new List<Comment>();
    public List<Recipe> Recipes { get; set; } = new List<Recipe>();
}
