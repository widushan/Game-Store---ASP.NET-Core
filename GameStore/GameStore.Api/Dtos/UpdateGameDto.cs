namespace GameStore.Api.Dtos;

using System.ComponentModel.DataAnnotations;

public record UpdateGameDto(
    [Required][StringLength(50)] string Name,
    [Required] string Genre,
    [Range(1,100000)] decimal Price,
    [Required] DateOnly ReleaseDate
);