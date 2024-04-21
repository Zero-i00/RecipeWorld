using backend.DTO.Auth;
using backend.DTO.User;
using backend.Models;

namespace backend.Mapper;

public static class UserMappers
{
    public static UserDto ToUserDto(this User userModel)
    {
        return new UserDto()
        {
            Id = userModel.Id.ToString(),
            Username = userModel.Username,
            FirstName = userModel.FirstName,
            LastName = userModel.LastName,
            Avatar = userModel.Avatar
        };
    }
    
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