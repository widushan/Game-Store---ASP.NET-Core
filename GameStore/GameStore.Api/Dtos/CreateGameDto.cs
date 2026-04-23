namespace GameStore.Api.Dtos;


using System.ComponentModel.DataAnnotations;

public record CreateGameDto(
    [Required][StringLength(50)] string Name,
    [Range(1,100)] int GenreId,
    [Range(1,100000)] decimal Price,
    [Required] DateOnly ReleaseDate
);