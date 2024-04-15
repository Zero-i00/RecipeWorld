namespace backend.Core.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; } = string.Empty;
    public string Password { get; } = string.Empty;
    public string? Avatar { get; } = string.Empty;
    public string FirstName { get; } = string.Empty;
    public string LastName { get; } = string.Empty;
}