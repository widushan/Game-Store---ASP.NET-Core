namespace GameStore.Api.Dtos;

using System.ComponentModel.DataAnnotations;

public record UpdateGameDto(
    [Required][StringLength(50)] string Name,
    [Range(1,100)] int GenreId,
    [Range(1,100000)] decimal Price,
    [Required] DateOnly ReleaseDate
);