namespace backend.DTO.User
{
    public class UserQuery
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[]? Avatar { get; set; }
    }
}
