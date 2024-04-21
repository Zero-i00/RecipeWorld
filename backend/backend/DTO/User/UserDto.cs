namespace backend.DTO.User;

public class UserDto
{
    public string Id { get; set; }
    public string Username { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string[]? Avatar { get; set; }
}
