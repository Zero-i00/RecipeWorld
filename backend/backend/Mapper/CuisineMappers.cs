using backend.DTO.Cuisine;
using backend.Models;

namespace backend.Mapper;

public static class CuisineMappers
{
    public static CuisineDto ToCuisineDto(this Cuisine cuisineModel)
    {
        return new CuisineDto
        {
            Id = cuisineModel.Id,
            Name = cuisineModel.Name,
        };
    }
}
