using backend.DTO.Auth;
using backend.Models;

namespace backend.Mapper;

public static class UserMappers
{
    public static User ToUserFromLoginDto(this LoginQuery loginQuery)
    {
        return new User
        {
            Username = loginQuery.Username,
            Password = loginQuery.Password
        };
    }
    
    public static User ToUserFromRegisterDto(this RegisterQuery registerQuery)
    {
        return new User
        {
            Username = registerQuery.Username,
            Password = registerQuery.Password,
            FirstName = registerQuery.FirstName,
            LastName = registerQuery.LastName,
        };
    }
}